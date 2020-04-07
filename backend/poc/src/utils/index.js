const isOffline = function () {
  // Depends on serverless-offline plugion which adds IS_OFFLINE to process.env when running offline
  return process.env.IS_OFFLINE;
};

module.exports = {
  isOffline,
};
