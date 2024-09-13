export default class ApiError extends Error {
  status;
  errors;
  constructor(status, errors, message) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, errors, message);
  }
}
