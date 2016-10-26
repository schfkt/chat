'use strict';

module.exports = function(req, res, next) {
  if (req.isSocket) {
    return next();
  }

  return res.badRequest('This method is only available via WebSockets');
};
