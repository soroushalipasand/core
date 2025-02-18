export default class Invoice {
  id: string;
  orderId: string;
  totalAmount: number;
  status: string;
  dueDate: Date;

  constructor(
    id: string,
    orderId: string,
    totalAmount: number,
    status: string,
    dueDate: Date,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.dueDate = dueDate;
  }
}
