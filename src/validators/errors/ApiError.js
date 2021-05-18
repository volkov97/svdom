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

module.exports = {
  ApiError,
  BadRequestApiError,
};
