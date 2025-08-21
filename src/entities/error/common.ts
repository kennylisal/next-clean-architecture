export class DatabaseOperationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class InvalidDomainMembershipRoleError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class AuthenticationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class AuthorizationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class DataNotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class SignUpError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class SignInError extends Error {
  constructor(message: string, opstions?: ErrorOptions) {
    super(message, opstions);
  }
}

export class UnexpectedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class DatabaseError extends Error {
  operation: string;
  constructor(message: string, operation: string, options?: ErrorOptions) {
    super(message, options);
    this.operation = operation;
  }
}

export class NotSignedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ClerkError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ForbiddenActionError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
