// manage mosaic
// http://tadajam.hateblo.jp/entry/2017/08/28/165305 の How to create a Mosaic

const nemlib = require("nem-library");
const observable = require("rxjs/Observable");

const crypto = require('./crypto');
const models = require('./models');
const wallet = require('./wallet');


const getBalance = async (address) => {
  return new Promise((resolve, reject) => {
    var address = new nemlib.Address(address);
    var accountOwnedMosaics = new nemlib.AccountOwnedMosaicsService(new nemlib.AccountHttp(), new nemlib.MosaicHttp());
    accountOwnedMosaics.fromAddress(address).subscribe(function (mosaics) {
      console.log(mosaics);
      resolve(mosaics);
    });
  });
}
module.exports.getBalance = getBalance


const sendNem  = async (amount, receivedAddress) => {
  return new Promise((resolve, reject) => {
    // TODO get by host privatekey from os.env.
    let account = nemlib.Account.createWithPrivateKey('dab0fe2c58f1153b8bfa73c48b6773d2588ef65ce0d2cecd26fb8e1493df2bc0');
    let tx = nemlib.TransferTransaction.create(
        nemlib.TimeWindow.createWithDeadline(),
        new nemlib.Address(receivedAddress),
        new nemlib.XEM(amount),
        nemlib.EmptyMessage
      );
    let signedTransaction = account.signTransaction(tx);
    let transactionHttp = new nemlib.TransactionHttp();
    transactionHttp.announceTransaction(signedTransaction)
      .subscribe(nemAnnounceResult => {
        console.log(nemAnnounceResult)
        resolve(nemAnnounceResult);
      });
  });
}
module.exports.sendNem = sendNem


const sendMosaic = async (namespace, mosaicname, address, amount, receivedAddress) => {
  let user = await models.User.findOne({ where: {address: address} })
  let username = user.get('username')
  let password = user.get('password')

  return new Promise((resolve, reject) => {
    if (amount < 0) {
      return false;
    }

    // test-todoroki
    // let account = Account.createWithPrivateKey("dab0fe2c58f1153b8bfa73c48b6773d2588ef65ce0d2cecd26fb8e1493df2bc0");
    // console.log(username + ':' + password);

    // TODO get private key from db
    // let privatekey = 'dab0fe2c58f1153b8bfa73c48b6773d2588ef65ce0d2cecd26fb8e1493df2bc0' // todoroki
    let privatekey = crypto.generatePrivateKey(password);
    let account = nemlib.Account.createWithPrivateKey(privatekey);

    let mosaicHttp = new nemlib.MosaicHttp();
    let transactionHttp = new nemlib.TransactionHttp();

    observable.Observable.from([
      {mosaic: new nemlib.MosaicId(namespace, mosaicname), quantity: amount},
    ]).flatMap(_ => mosaicHttp.getMosaicTransferableWithAmount(_.mosaic,_.quantity))
      .toArray()
      // .map(mosaics => {
      //   mosaics.unshift(new nemlib.XEM(0.000001));
      //   return mosaics;
      // })
      .map(mosaics => nemlib.TransferTransaction.createWithMosaics(
          nemlib.TimeWindow.createWithDeadline(),
          // new Address("TCFPN2-C43YUE-G4756P-SJ7EVV-VMGB2Y-SP2YJB-Q5E5"), // kazuki
          new nemlib.Address(receivedAddress),
          mosaics,
          // TODO: insert message by parameters
          nemlib.EmptyMessage
        )
      )
      .map(transaction => account.signTransaction(transaction))
      .flatMap(signedTransaction => transactionHttp.announceTransaction(signedTransaction))
      .subscribe(nemAnnounceResult => {
          console.log(nemAnnounceResult);
          resolve(nemAnnounceResult);
      });
  })
}
module.exports.sendMosaic = sendMosaic
