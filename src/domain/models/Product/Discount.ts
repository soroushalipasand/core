// src/domain/models/Product/Discount.ts
export class Discount {
  id: string;
  code: string;
  description?: string | null;
  percentage?: number | null;
  fixedAmount?: number | null;
  active: boolean;
  startDate?: string | null;
  endDate?: string | null;

  constructor(
    id: string,
    code: string,
    active: boolean,
    description?: string | null,
    percentage?: number | null,
    fixedAmount?: number | null,
    startDate?: string | null,
    endDate?: string | null,
  ) {
    this.id = id;
    this.code = code;
    this.active = active;
    this.description = description;
    this.percentage = percentage;
    this.fixedAmount = fixedAmount;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
