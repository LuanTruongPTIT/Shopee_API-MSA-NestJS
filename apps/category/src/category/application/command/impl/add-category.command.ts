import { ICommand } from '@nestjs/cqrs';
import { AddCategoryProductRequestDTO } from '../../../interface/dto/addCategoryProductRequest.dto';
export class AddCategoryProductCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly addCategoryProductDto: AddCategoryProductRequestDTO,
  ) {}
}
