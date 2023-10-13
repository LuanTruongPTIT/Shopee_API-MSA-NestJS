import { ENUM_ROLE_TYPE } from '../../constants/role.enum.constant';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { IPolicyRule } from '@libs/common/interfaces/policy.interface';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
@Schema({ collection: 'RoleEntity' })
export class RoleEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 30,
    type: String,
  })
  name: string;

  @Prop({
    required: false,
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean;

  @Prop({
    required: true,
    enum: ENUM_ROLE_TYPE,
    index: true,
    type: String,
  })
  type: ENUM_ROLE_TYPE;

  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [
      {
        subject: {
          type: String,
          enum: ENUM_ROLE_TYPE,
          required: true,
        },
        action: {
          type: Array,
          required: true,
          default: [],
        },
      },
    ],
  })
  permissions: IPolicyRule[];
}
export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
export type RoleDoc = RoleEntity & Document;
RoleSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.name.toLowerCase();
  next();
});
