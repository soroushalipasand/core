import Attribute from './Attribute';

// src/domain/models/AttributeValue.ts
export default class AttributeValue {
  constructor(
    public id: string, // Optional parameter should come last
    public value: string,
    public attributeId: string,
    public attribute?: Attribute,
  ) {}
}
