import { IEvent } from '@nestjs/cqrs';
import { AddCategoryProductRequestDTO } from './../../interface/dto/addCategoryProductRequest.dto';
export class AddCategoryEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly addCategoryProductRequestDto: AddCategoryProductRequestDTO,
  ) {}
}
