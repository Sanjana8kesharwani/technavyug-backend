import ApiError from "../utils/apiError.js";

const errorHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Sequelize unique constraint error mapping
  if (err.name === "SequelizeUniqueConstraintError") {
    const field = err.errors.map((e) => e.path).join(", ");
    error = new ApiError(400, `Duplicate value for field: ${field}`);
  }

  // Sequelize validation error mapping
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((e) => e.message).join(", ");
    error = new ApiError(400, message);
  }

  if (err.name === "CastError") {
    error = new ApiError(404, `Resource not found with id ${err.value}`);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    error = new ApiError(400, `Duplicate value for field: ${field}`);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((v) => v.message)
      .join(", ");
    error = new ApiError(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token");
  }

  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    errors: error.errors || [],
  });
};

export { errorHandler };
