import { ICommand } from '@nestjs/cqrs';
import { AddAttributeCategoryRequestDto_v2 } from '../../../interface/dto/AddAttributCategory.v2.request.dto';
export class AddAttributeCategoryCommand implements ICommand {
  constructor(
    public readonly streamId,
    public readonly addAttributeCategoryRequestDto_v2: AddAttributeCategoryRequestDto_v2,
  ) {}
}
