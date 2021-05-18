class ApiError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
  }
}

class BadRequestApiError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class NotFoundApiError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = {
  ApiError,
  BadRequestApiError,
  NotFoundApiError,
};
