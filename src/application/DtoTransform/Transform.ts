export default abstract class Transform<T, U> {
  transformCollection(items: T[]): U[] {
    return items.map((item) => this.transform(item));
  }

  abstract transform(item: T): U;
}
