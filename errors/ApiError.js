
class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(ctx, errorMessage) {
    ctx.status = 400
    return ctx.body = {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    }
  }

  static unauthorizad(ctx, errorMessage) {
    ctx.status = 401
    return ctx.body = {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    }
  }

  static forbidden(ctx, errorMessage) {
    ctx.status = 403
    return ctx.body = {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    }
  }

  static notFound(ctx, errorMessage) {
    ctx.status = 404
    return ctx.body = {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    }
  }

  static internal(ctx, errorMessage) {
    console.log(errorMessage.message);
    ctx.status = 500
    return ctx.body = {
      friendlyMsg: errorMessage.friendlyMsg,
    }
  }
}

module.exports = ApiError;
