/**
 * manager for wallet
 */

import {SimpleWallet, Password, NetworkTypes, NEMLibrary} from "nem-library";

export module Wallet {
  export function createSimpleWallet(userName: any, password: any) {
    let objPassword = new Password(password);
    let wallet = SimpleWallet.create(userName, objPassword);
  }
}
