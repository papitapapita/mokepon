export default function errorHandler(err, req, res) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  if (err.isBoom) {
    const { output } = err;
    return res
      .status(output.statusCode)
      .json(output.payload);
  }

  res.status(status).json({
    error: err.name || 'InternalServerError',
    message
  });
}
