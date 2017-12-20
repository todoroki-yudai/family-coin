// manage mosaic
// http://tadajam.hateblo.jp/entry/2017/08/28/165305 の How to create a Mosaic

import {
  Account,
  Address,
  EmptyMessage,
  MosaicHttp,
  MosaicId,
  NEMLibrary,
  NetworkTypes,
  SignedTransaction,
  TransactionHttp,
  TransferTransaction,
  TimeWindow,
  XEM
} from "nem-library";
import {Observable} from "rxjs/Observable";

export module Mosaic {
  let namespace = 'todoroki';
  let mosaic = 'peace-coin';

  let mosaicHttp = new MosaicHttp();
  let transactionHttp = new TransactionHttp();

  export function sendMosaic(username, password, amount, receivedAddress) {
    if (amount < 0) {
      return false
    }
    // test-todoroki
    // let account = Account.createWithPrivateKey("dab0fe2c58f1153b8bfa73c48b6773d2588ef65ce0d2cecd26fb8e1493df2bc0");
    let account = Account.create(username, password);

    Observable.from([
      {mosaic: new MosaicId(namespace, mosaic), quantity: amount},
    ]).flatMap(mosaicWithAmount => mosaicHttp.getMosaicTransferableWithAmount(
        mosaicWithAmount.mosaic,
        mosaicWithAmount.quantity
      ))
      .toArray()
      .map(mosaics => {
        mosaics.unshift(new XEM(1));
        return mosaics;
      })
      .map(mosaics => TransferTransaction.createWithMosaics(
          TimeWindow.createWithDeadline(),
          // new Address("TCFPN2-C43YUE-G4756P-SJ7EVV-VMGB2Y-SP2YJB-Q5E5"), // kazuki
          new Address(receivedAddress),
          mosaics,
          EmptyMessage
        )
      )
      .map(transaction => account.signTransaction(transaction))
      .flatMap(signedTransaction => transactionHttp.announceTransaction(signedTransaction))
      .subscribe(nemAnnounceResult => {
          console.log(nemAnnounceResult);
      });
  }
}
