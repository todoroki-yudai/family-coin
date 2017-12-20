'use strict';

import { Wallet } from '../lib/wallet';
import { User } from '../lib/sequelize';

export function post__users_entry(args, res, next) {
  /**
   * entry user info
   *
   * - create nem address
   * - save user info to database
   **/
  // create nem address
  let username = args.username.value;
  let password = args.password.value;

  // TODO: implement error process
  console.log('create wallet before');
  var simpleWallet = Wallet.createSimpleWallet(username, password);

  // save user info to database
  User.findOrCreate(
    {
      'where': {'username': username},
      'defaults': {'username': username, 'password': password}
    }
  ).then(function(user: any, created: any) {
      // res.send({'user': user, 'created': created}
      var values: {key?: string; } = {};
      values['application/json'] = {
        'result' : 'OK',
        'message' : ''
      };
      if (Object.keys(values).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(values[Object.keys(values)[0]] || {}, null, 2));
      } else {
        res.end();
      }
  }).catch(function(err: any) {
    var values = {};
    values['application/json'] = {
      'result' : 'NG',
      'message' : err
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(values[Object.keys(values)[0]] || {}, null, 2));
  });
  // var user = new User({
  //     name: args.username.value,
  //     password: args.password.value // TODO encyption
  // });
  // user.save();

  // var values = {};
  // values['application/json'] = {
  //   'result' : 'OK',
  //   'message' : ''
  // };
  // if (Object.keys(values).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(values[Object.keys(values)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

export function get__users_me(args, res, next) {
  /**
   *
   *
   *
   * token String Use this access token to access the API server
   * returns User
   **/
  var examples = {};
    examples['application/json'] = {
    'balance' : 10,
    'address' : 'XXXXX',
    'increase_coin' : 6,
    'user_name' : 'todoroki',
    'id' : '1'
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

export function get__users_me_points(args, res, next) {
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
  'my_point' : 0,
  'type' : 'THANKS'
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

export function get__users_me_transactions (args, res, next) {
  /**
   * v0.1+ | Get transaction's record for each user
   *
   * token String Use this access token to access the API server
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [
    {
      'amount' : +10,
      'user_name' : 'todoroki',
      'message' : 'Good Job',
      'timestamp' : '2000-01-23T04:56:07.000+00:00'
    },
    {
      'amount' : -3,
      'user_name' : 'yudai',
      'message' : 'Good Job 2',
      'timestamp' : '2017-01-23T04:56:07.000+00:00'
    }
  ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

export function post__users_login(args, res, next) {
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
  examples['application/json'] = '';
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

export function post__users_me_logout(args, res, next) {
  /**
   *
   *
   *
   * token String Use this access token to access the API server
   * returns ResultMessage
   **/
  var examples = {};
  examples['application/json'] = {
  'result' : 'OK',
  'message' : ''
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}
