import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import {
  EventStoreFeatureAsyncOptions,
  EventStoreFeatureOptionsFactory,
  EventStoreModuleAsyncOptions,
  EventStoreModuleOptions,
  EventStoreOptionConfig,
  EventStoreOptionsFactory,
  NEST_EVENTSTORE_FEATURE_OPTION,
  NEST_EVENTSTORE_OPTION,
  ProvidersConstants,
} from './contract';
import { EventStore } from './event-store';
import { NestjsEventStore } from './nestjs-event-store.class';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectionDto } from './adapter/projection.dto';
import { MongoStore } from './adapter/mongo-store';

@Global()
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ProjectionDto])],
  providers: [MongoStore],
})
export class EventStoreCoreModule {
  static register(option: EventStoreModuleOptions): DynamicModule {
    const eventStoreProviders = {
      provide: ProvidersConstants.EVENT_STORE_PROVIDER,
      useFactory: () => {
        return new NestjsEventStore();
      },
    };

    const configProv = {
      provide: ProvidersConstants.EVENT_STORE_CONNECTION_CONFIG_PROVIDER,
      useValue: {
        ...option,
      },
    };

    return {
      module: EventStoreCoreModule,
      imports: [TypeOrmModule.forFeature([ProjectionDto])],
      providers: [eventStoreProviders, configProv, MongoStore],
      exports: [eventStoreProviders, configProv],
    };
  }

  static registerAsync(options: EventStoreModuleAsyncOptions): DynamicModule {
    const eventStoreProviders = {
      provide: ProvidersConstants.EVENT_STORE_PROVIDER,
      useFactory: () => {
        return new NestjsEventStore();
      },
    };

    const configProv: Provider = {
      provide: ProvidersConstants.EVENT_STORE_CONNECTION_CONFIG_PROVIDER,
      useFactory: async (esOptions: EventStoreModuleOptions) => {
        return {
          ...esOptions,
        };
      },
      inject: [NEST_EVENTSTORE_OPTION],
    };

    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: EventStoreCoreModule,
      imports: [...options.imports, TypeOrmModule.forFeature([ProjectionDto])],
      providers: [
        ...asyncProviders,
        eventStoreProviders,
        configProv,
        MongoStore,
      ],
      exports: [eventStoreProviders, configProv],
    };
  }

  static registerFeature(config: EventStoreOptionConfig): DynamicModule {
    if (config === undefined || config === null) {
      throw new Error('Config missing');
    }

    return {
      module: EventStoreCoreModule,
      imports: [TypeOrmModule.forFeature([ProjectionDto])],
      providers: [
        ExplorerService,
        {
          provide: ProvidersConstants.EVENT_STORE_STREAM_CONFIG_PROVIDER,
          useValue: {
            ...config,
          },
        },
        EventStore,
        MongoStore,
      ],
      exports: [EventStore, ExplorerService],
    };
  }

  static registerFeatureAsync(
    options: EventStoreFeatureAsyncOptions,
  ): DynamicModule {
    const configProv: Provider = {
      provide: ProvidersConstants.EVENT_STORE_STREAM_CONFIG_PROVIDER,
      useFactory: async (config: EventStoreOptionConfig) => {
        return {
          ...config,
        };
      },
      inject: [NEST_EVENTSTORE_FEATURE_OPTION],
    };

    const asyncProviders = this.createFeatureAsyncProviders(options);

    return {
      module: EventStoreCoreModule,
      imports: [TypeOrmModule.forFeature([ProjectionDto])],
      providers: [
        ...asyncProviders,
        ExplorerService,
        configProv,
        EventStore,
        MongoStore,
      ],
      exports: [EventStore, ExplorerService],
    };
  }

  private static createAsyncProviders(
    options: EventStoreModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<EventStoreOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: EventStoreModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_EVENTSTORE_OPTION,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass ||
        options.useExisting) as Type<EventStoreOptionsFactory>,
    ];
    return {
      provide: NEST_EVENTSTORE_OPTION,
      useFactory: async (optionsFactory: EventStoreOptionsFactory) =>
        await optionsFactory.createEventStoreOptions(options.name),
      inject,
    };
  }

  private static createFeatureAsyncProviders(
    options: EventStoreFeatureAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createFeatureAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<EventStoreFeatureOptionsFactory>;
    return [
      this.createFeatureAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createFeatureAsyncOptionsProvider(
    options: EventStoreFeatureAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_EVENTSTORE_FEATURE_OPTION,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass ||
        options.useExisting) as Type<EventStoreFeatureOptionsFactory>,
    ];
    return {
      provide: NEST_EVENTSTORE_FEATURE_OPTION,
      useFactory: async (optionsFactory: EventStoreFeatureOptionsFactory) =>
        await optionsFactory.createFeatureOptions(options.name),
      inject,
    };
  }
}
