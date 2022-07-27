export class RecordNotFoundException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class RecordAlreadyExistException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class ValidationException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class ConflictException extends Error {}
