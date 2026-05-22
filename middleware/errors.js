// errors.js
function handleErrors(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message;
  const errors = err.errors;

  res.status(status).json({
    status: status,
    message: message,
    errors: errors,
  });
}

module.exports = { handleErrors };
