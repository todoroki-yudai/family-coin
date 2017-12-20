'use strict';

import { Mosaic } from '../lib/mosaic';

import {SimpleWallet, Password, NetworkTypes, NEMLibrary} from 'nem-library';

export function post__thanks_send(args, res, next) {
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
  // console.log(args.amount.value);
  // send mosaic
  // function sendMosaic(amount, prevKey, receivedAddress) {
  Mosaic.sendMosaic(
    args.username.value,
    args.password.value,
    args.amount.value,
    args.receivedAddress.value
  )
  var resultValues = {};
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
