'use strict';

exports.get__users_me = function(args, res, next) {
  /**
   *
   *
   *
   * token String Use this access token to access the API server
   * returns User
   **/
  var examples = {};
  examples['application/json'] = {
  "balance" : 10,
  "address" : "XXXXX",
  "increase_coin" : 6,
  "user_name" : "todoroki",
  "id" : "1"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.get__users_me_points = function(args, res, next) {
  /**
   *
   *
   *
   * token String Use this access token to access the API server
   * type String
   * returns UserPoints
   **/
  var examples = {};
  examples['application/json'] = {
  "my_point" : 0,
  "type" : "THANKS"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.get__users_me_transactions = function(args, res, next) {
  /**
   * v0.1+ | Get transaction's record for each user
   *
   * token String Use this access token to access the API server
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [
    {
      "amount" : +10,
      "user_name" : "todoroki",
      "message" : "Good Job",
      "timestamp" : "2000-01-23T04:56:07.000+00:00"
    },
    {
      "amount" : -3,
      "user_name" : "yudai",
      "message" : "Good Job 2",
      "timestamp" : "2017-01-23T04:56:07.000+00:00"
    }
  ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.post__users_login = function(args, res, next) {
  /**
   * user login
   *
   * method String designate facebook or mail_address.
   * mail String email address. (optional)
   * password String plain password user entered. (optional)
   * openid_access_token String Access token sent from OAuth Server (optional)
   * returns Authorize
   **/
  var examples = {};
  examples['application/json'] = "";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.post__users_me_logout = function(args, res, next) {
  /**
   *
   *
   *
   * token String Use this access token to access the API server
   * returns ResultMessage
   **/
  var examples = {};
  examples['application/json'] = {
  "result" : "OK",
  "message" : ""
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}
