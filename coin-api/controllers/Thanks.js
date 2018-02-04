'use strict';

var url = require('url');

var Thanks = require('../services/ThanksService');

module.exports.get__thanks_transactions = function get__thanks_transactions (req, res, next) {
  Thanks.get__thanks_transactions(req.swagger.params, res, next);
};

module.exports.post__thanks_send = function post__thanks_send (req, res, next) {
  Thanks.post__thanks_send(req.swagger.params, res, next);
};

module.exports.get__thanks_term = function get__thanks_term (req, res, next) {
  Thanks.get__thanks_term(req.swagger.params, res, next);
};

module.exports.post__thanks_term = function post__thanks_term (req, res, next) {
  Thanks.post__thanks_term(req.swagger.params, res, next);
};
