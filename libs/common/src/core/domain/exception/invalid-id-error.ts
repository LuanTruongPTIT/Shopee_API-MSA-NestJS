export class InvalidIdError extends Error {
  constructor(stack?: string) {
    super(stack);
  }

  public static withString(value: string): InvalidIdError {
    return new InvalidIdError(`${value} is not a valid uuid v4`);
  }
}
