import { TCPClient } from 'geteventstore-promise';
export const eventStoreProviders = [
  {
    provide: TCPClient,
    useFactory: (): TCPClient =>
      new TCPClient({
        hostname: '0.0.0.0',
        port: 1113,
        credentials: {
          username: 'admin',
          password: 'changeit',
        },
        // poolOptions:
      }),
  },
];
