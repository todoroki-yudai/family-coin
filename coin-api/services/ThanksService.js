'use strict';

var constvalue = require('../lib/const');
var models = require('../lib/models');
var mosaic = require("../lib/mosaic");
var response = require("../lib/response");

const get__thanks_transactions = async (args, res, next) => {
  /**
   * v0.1+ | find transactions
   * find transactions
   *
   * token String Use this access token to access the API server
   * starging_date date
   * end_date date
   * returns List
   **/
   // TODO; move to decorator
   let values = jwt.verifyAccessToken(args.token.value);
   if(!values) {
     response.err(res, new Error('token invalid'), 403)
     return
   }
   try {
     var startingDate = args.start_date.value
     var endDate = args.end_date.value
     // can't not use "var". because "ReferenceError: user is not defined" is occured.
     let transactions = await models.Transaction.findAll({
       where: {
         created_at: {
           $between: [startingDate, endDate]
         }
       }
     })

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
module.exports.get__thanks_transactions = get__thanks_transactions

const post__thanks_send = async (args, res, next) => {
  /**
   * v0.1+ | send coins to someone
   * send coins to someone
   *
   * token String Use this access token to access the API server
   * receiver_address String
   * amount Integer
   * message String
   * returns ResultMessage
   **/
  // TODO; move to decorator
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  let transaction;
  try {
    // get transaction
    transaction = await models.sequelize.transaction();

    if (!args.amount.value || parseFloat(args.amount.value) <= 0) {
      throw new Error('cant send amount 0 or less')
    }

    var senderAddress = values.address;
    var receiverAddress = args.receiver_address.value;

    console.log(senderAddress);
    console.log(receiverAddress);

    ///// db
    // transaction
    await models.Transaction.create({
      'sender_address': senderAddress,
      'receiver_address': receiverAddress,
      'amount': args.amount.value,
      'message': args.message.value,
    }, {transaction})

    // create balance
    let balance = await models.UserBalanceLog.getBalance(senderAddress)
    await models.UserBalanceLog.create({
      'address': senderAddress,
      'balance': balance - parseFloat(args.amount.value)
    }, {transaction})

    balance = await models.UserBalanceLog.getBalance(receiverAddress)
    await models.UserBalanceLog.create({
      'address': receiverAddress,
      'balance': balance + parseFloat(args.amount.value)
    }, {transaction})

    // block chain
    if (args.usemosaic.value == 'true') {
      let result = await mosaic.sendMosaic(
        constvalue.NAMESPACE,
        constvalue.MOSAICNAME,
        senderAddress,
        args.amount.value,
        receiverAddress
      );
    }

    // commit
    await transaction.commit();

    let resultValues = {};
    resultValues['application/json'] = {
      'result' : 'OK',
      'message' : ''
    };
    if (Object.keys(resultValues).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(
        resultValues[Object.keys(resultValues)[0]] || {}, null, 2));
    } else {
      res.end();
    }
  }
  catch (err) {
    // rollback
    await transaction.rollback();

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
module.exports.post__thanks_send = post__thanks_send


const get__thanks_term = async (args, res, next) => {
  // TODO; move to decorator
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  try {
    // TODO: check argument value
    var targetDate = args.target_date.value
    var type = args.type.value

    // get term data by targetDate
    let thanksTerm = null
    if (type == 'latest') {
      thanksTerm = await models.ThanksTerm.getLatest()
    } else {
      thanksTerm = await models.ThanksTerm.getByTargetData(targetDate)
    }
    let body = {};
    body['application/json'] = thanksTerm;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
  catch (err) {
    console.log(err);
    response.err(res, err, 500)
  }
}
module.exports.get__thanks_term = get__thanks_term

const post__thanks_term = async (args, res, next) => {
  let values = jwt.verifyAccessToken(args.token.value);
  if(!values) {
    response.err(res, new Error('token invalid'), 403)
    return
  }
  try {
    if (args.id.value) {
      // update
      let thanksTerm = await models.ThanksTerm.findOne({
        where: { id: args.id.value }
      })
      if (!thanksTerm) {
        response.err(res, 'can\'t find data. id = '+args.id.value, 404)
        return;
      }
      // TODO validate values
      if (args.start_date.value) thanksTerm.start_date = args.start_date.value
      if (args.end_date.value) thanksTerm.end_date = args.end_date.value
      if (args.is_sent.value) thanksTerm.is_sent = args.is_sent.value

      thanksTerm.save()

      // return value
      response.success(res, '')
    } else {
      // insert
      if (!args.start_date.value || !args.end_date.value) {
        response.err(res, 'start_date, end_date is required', 403)
        return;
      }
      // TODO validate values
      // TODO range check. Do not overlap periods.
      await models.ThanksTerm.create({
        'start_date': args.start_date.value,
        'end_date': args.end_date.value,
        'is_sent': args.is_sent.value
      })
      // return value
      response.success(res, '')
    }
  }
  catch (err) {
    console.log(err);
    response.err(res, err, 500)
  }
}
module.exports.post__thanks_term = post__thanks_term
