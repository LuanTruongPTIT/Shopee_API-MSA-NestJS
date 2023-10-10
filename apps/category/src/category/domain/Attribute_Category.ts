import { AggregateRoot } from '@nestjs/cqrs';
import { Attribute_Value } from '../infrastructure/entity/attribute.value.entity';

export type AttributeEssentialProperties = Readonly<
  Required<{
    _id: string;
    original_attribute_name: string;
    display_attribute_name: string;
    input_validation_type: string;
    value_unit: Array<string>;
    is_mandatory: boolean;
    attribue_value_id: Attribute_Value[];
  }>
>;
export type AttributeProperties = AttributeEssentialProperties;
export interface AttributeCategory {
  add: (_id: string, attributeProperties: AttributeProperties) => void;
}
// export class AttributeCategoryImplement extends
