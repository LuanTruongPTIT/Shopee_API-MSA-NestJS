import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from '../../../../../common/src/base/base-entity.dto';

@Entity('projections')
export class ProjectionDto extends BaseEntityDto {
  constructor(
    streamName: string,
    eventNumber: number,
    expectedVersion?: number,
  ) {
    super(); // Gọi constructor của lớp cơ sở BaseEntityDto
    this.streamName = streamName;
    this.eventNumber = eventNumber;
    // this.expectedVersion = expectedVersion;
  }

  @Column()
  streamName: string;

  @Column()
  eventNumber: number;

  @Column()
  expectedVersion: number;
}
