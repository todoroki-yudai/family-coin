'use strict';

var url = require('url');

var Users = require('../services/UsersService');

module.exports.post__users_entry = function post__users_entry (req, res, next) {
  Users.post__users_entry(req.swagger.params, res, next);
};

module.exports.get__users_balances = function get__users_balances (req, res, next) {
  Users.get__users_balances(req.swagger.params, res, next);
};

module.exports.get__users_me = function get__users_me (req, res, next) {
  Users.get__users_me(req.swagger.params, res, next);
};

module.exports.get__users_me_points = function get__users_me_points (req, res, next) {
  Users.get__users_me_points(req.swagger.params, res, next);
};

module.exports.get__users_me_transactions = function get__users_me_transactions (req, res, next) {
  Users.get__users_me_transactions(req.swagger.params, res, next);
};

module.exports.post__users_login = function post__users_login (req, res, next) {
  Users.post__users_login(req.swagger.params, res, next);
};

module.exports.post__users_me_logout = function post__users_me_logout (req, res, next) {
  Users.post__users_me_logout(req.swagger.params, res, next);
};
