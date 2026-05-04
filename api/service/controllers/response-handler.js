export const setSuccess = (data, response, statusCode = 200) => {
  response.status(statusCode).json({ success: true, data });
};

export const setError = (error, response, statusCode = 400) => {
  response
    .status(statusCode)
    .json({ success: false, error: error.message || error });
};

