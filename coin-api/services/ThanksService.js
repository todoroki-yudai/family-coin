'use strict';

var constvalue = require('../lib/const');
var models = require('../lib/models');
var mosaic = require("../lib/mosaic");

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
   try {
     // TODO get address from access token. following value is raw address. it's bad source.
     var address = args.token.value;
     var startingDate = args.starting_date.value
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
     res.status(500);
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
   * received_address String
   * amount Integer
   * message String
   * returns ResultMessage
   **/
  let transaction;
  try {
    // get transaction
    transaction = await models.sequelize.transaction();

    if (!args.amount.value || parseFloat(args.amount.value) <= 0) {
      throw new Error('cant send amount 0 or less')
    }

    // TODO: get address from access token. following value is raw address. It's not very well
    var senderAddress = args.token.value;
    var receiverAddress = args.received_address.value;

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
    // TODO : set status code
    res.setHeader('Content-Type', 'application/json');
    // res.status(500).end <- bad
    res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
  }
}
module.exports.post__thanks_send = post__thanks_send
