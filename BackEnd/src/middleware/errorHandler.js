const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Default error status and message
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Customize response based on environment
  const response = {
    error: {
      message: process.env.NODE_ENV === 'production' && status === 500 
        ? 'Internal Server Error' 
        : message,
      status
    }
  };

  // Add stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(status).json(response);
};

module.exports = errorHandler;
