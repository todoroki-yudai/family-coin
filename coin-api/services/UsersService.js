'use strict';

// TODO: move to model
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var constvalue = require('../lib/const');
var crypto = require('../lib/crypto');
var jwt = require('../lib/jsonwebtoken');
var models = require('../lib/models');
var mosaic = require('../lib/mosaic');
var response = require("../lib/response");
var wallet = require('../lib/wallet');

const get__users_balances = function(args, res, next) {
  get_users_balances(args, res, next, null)
}
module.exports.get__users_balances = get__users_balances

const get__users_me_balances = function(args, res, next) {
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  get_users_balances(args, res, next, values.address)
}
module.exports.get__users_me_balances = get__users_me_balances

const get_users_balances = async(args, res, next, address) => {
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  try {
    let startingDate = args.start_date.value
    let endDate = args.end_date.value
    let whereMap = {}
    if (address) {
      whereMap['address'] = address
    }
    if (startingDate && endDate) {
      whereMap['created_at'] = {$between: [startingDate, endDate]}
    }
    else if (startingDate) {
      whereMap['created_at'] = {[gte]: startingDate}
    }
    else if (endDate) {
      whereMap['created_at'] = {[lte]: endDate}
    }
    let balances = await models.UserBalanceLog.findAll({
      attributes: ['id', 'address', 'balance', 'created_at'],
      where: whereMap,
      order: [
        [ 'address', 'ASC' ],
        [ 'created_at', 'ASC' ]
      ]
    });

    let body = {};
    body['application/json'] = balances;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    let body = {};
    body['application/json'] = {
      'result' : 'NG',
      'message' : err
    };
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
}

// TODO: deprecated. merge to get__users_balances
const get__users_balances_latest = async (args, res, next) => {
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  try {
    let balances = await models.UserBalanceLog.getBalanceLatest()
    let body = {};
    body['application/json'] = balances;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    let body = {};
    body['application/json'] = {
      'result' : 'NG',
      'message' : err
    };
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
}
module.exports.get__users_balances_latest = get__users_balances_latest

const post__users_entry = async (args, res, next) => {
  /**
   * entry user info
   *
   * - create nem address
   * - save user info to database
   **/
   try {
      // create nem address
      let username = args.username.value;
      // TODO validation
      let crptoPassword = crypto.generateHash(args.password.value);
      let email = args.email.value;

      // TODO: implement error process
      var simpleWallet = wallet.createSimpleWallet(username, crptoPassword);
      console.log(simpleWallet.address.value);

      // save user info to database
      let user = await models.User.findOrCreate(
        {
          'where': {'username': username},
          'defaults': {
            'username': username,
            'email': email,
            'password': crptoPassword,
            'address': simpleWallet.address.value,
          }
        }
      )

      // send xem for interchange coin if created
      // if (created) {
      //   let result = await mosaic.sendNem(
      //     1, // amount
      //     simpleWallet.address.value
      //   );
      // }

      let values = {};

      let jwtValues = jwt.createAccessToken(user[0])
      values['application/json'] = {
        'token' : jwtValues.token,
        'expires_in' : jwtValues.expiresIn
      };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(values[Object.keys(values)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    let body = {};
    body['application/json'] = {
      'result' : 'NG',
      'message' : err
    };
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
}
module.exports.post__users_entry = post__users_entry


const get__users_me = async (args, res, next) => {
  try {
    let values = jwt.verifyAccessToken(args.token.value);
    if(!values) {
      response.err(res, new Error('token invalid'), 403)
      return
    }
    var address = values.address;
    // can't not use "var". because "ReferenceError: user is not defined" is occured.
    let user = await models.User.findOne({ where: {address: address} })
    let walletInfo = await wallet.getInfo(address)

    // delete
    let username = user.get('username')
    let password = user.get('password')
    let privatekey = crypto.generatePrivateKey(password);
    console.log(privatekey);
    // delete

    let body = {};
    // console.log(walletInfo);
    body['application/json'] = {
      // 'balance' : walletInfo.balance,
      'balance' : user.balance || 0, // TODO: for teaser
      'nem_balance' : walletInfo.nemBalance,
      'address' : walletInfo.address,
      'increase_coin' : -1, // TODO 実装する
      'username' : user.get('username'),
      'roles' : ['admin'], // TODO implement
      'avatar' : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', // TODO implement
      'introduction' : 'Super Admin', // TODO implement
      'id' : user.get('id')
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    let body = {};
    body['application/json'] = {
      'result' : 'NG',
      'message' : err
    };
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
}
module.exports.get__users_me = get__users_me

module.exports.get__users_me_points = function (args, res, next) {
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

const get__users_me_transactions = async (args, res, next) => {
  /**
   * v0.1+ | Get transaction's record for each user
   *
   * token String Use this access token to access the API server
   * returns List
   **/
   // TODO; move to decorator
   let values = jwt.verifyAccessToken(args.token.value);
   if(!values) {
     response.err(res, new Error('token invalid'), 403)
     return
   }
   var address = values.address;
   try {
     let startingDate = args.start_date.value
     let endDate = args.end_date.value
     // can't not use "var". because "ReferenceError: user is not defined" is occured.

     let whereMap = {
        [Op.or]: [
          { sender_address: address },
          { receiver_address: address }
        ]
       }
     if (startingDate && endDate) {
       whereMap['created_at'] = {$between: [startingDate, endDate]}
     }
     else if (startingDate) {
       whereMap['created_at'] = {[gte]: startingDate}
     }
     else if (endDate) {
       whereMap['created_at'] = {[lte]: endDate}
     }
     let transactions = await models.Transaction.findAll({ where: whereMap });

     let body = {};
     body['application/json'] = transactions;

     res.setHeader('Content-Type', 'application/json');
     res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
   }
   catch (err) {
     console.log(err);
     let body = {};
     body['application/json'] = {
       'result' : 'NG',
       'message' : err
     };
     res.statusCode = 500;
     res.setHeader('Content-Type', 'application/json');
     res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
   }

}
module.exports.get__users_me_transactions = get__users_me_transactions

module.exports.post__users_login = async(args, res, next) => {
  /**
   * user login
   *
   * method String designate facebook or mail_address.
   * mail String email address. (optional)
   * password String plain password user entered. (optional)
   * openid_access_token String Access token sent from OAuth Server (optional)
   * returns Authorize
   **/
   try {
    // create nem address
    let username = args.username.value;
    // TODO validation password
    let crptoPassword = crypto.generateHash(args.password.value);

    // save user info to database
    let user = await models.User.findOne(
      {
        'where': {'username': username, 'password': crptoPassword},
      }
    )

    let values = {};
    if (user) {
      let jwtValues = jwt.createAccessToken(user)
      values['application/json'] = {
        'token' : jwtValues.token,
        'expires_in' : jwtValues.expiresIn
      };
    }
    else {
      values['application/json'] = {
        'token' : '',
        'expires_in' : '0' // TODO: implement
      };
      res.statusCode = 401;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(values[Object.keys(values)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    response.err(res, err, 404)
  }
}

module.exports.post__users_me_logout = function(args, res, next) {
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
