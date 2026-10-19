// Centralized error handling middleware for Express
function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    // Only show stack trace in non-production environments
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = errorHandler;
