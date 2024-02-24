const sendResponse = (res, status, success, message, data = undefined) => {
  return res.status(status).json({ success, message, data });
};

module.exports = sendResponse;
