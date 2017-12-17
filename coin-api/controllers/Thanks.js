'use strict';

var url = require('url');

var Thanks = require('./ThanksService');

module.exports.post__thanks_send = function post__thanks_send (req, res, next) {
  Thanks.post__thanks_send(req.swagger.params, res, next);
};
