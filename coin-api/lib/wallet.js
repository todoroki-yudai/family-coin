/**
 * manager for wallet
 */

const nemlib = require("nem-library");

const constvalue = require('./const');
const crypto = require("../lib/crypto");


const createSimpleWallet = function(userName, cryptoPassword) {
  let objPassword = new nemlib.Password(cryptoPassword);
  let privateKey = crypto.generatePrivateKey(cryptoPassword);
  return nemlib.SimpleWallet.createWithPrivateKey(userName, objPassword, privateKey);
}
module.exports.createSimpleWallet = createSimpleWallet


/**
 * Get wallet information by address
 */
const getInfo = function(address) {

  // var address = new nemlib.Address("TDC54V-STM3GN-FMR6IV-VDQNVH-KEIZ3A-AN55RK-DCGP");
  // var accountOwnedMosaics = new nemlib.AccountOwnedMosaicsService(new nemlib.AccountHttp(), new nemlib.MosaicHttp());
  // accountOwnedMosaics.fromAddress(address).subscribe(function (mosaics) {
  //     console.log(mosaics);
  // });

  return new Promise((resolve, reject) => {

    // 残高
    var addressObj = new nemlib.Address(address);
    var accountOwnedMosaics = new nemlib.AccountOwnedMosaicsService(new nemlib.AccountHttp(), new nemlib.MosaicHttp());
    accountOwnedMosaics.fromAddress(addressObj)
      .subscribe(function (mosaics) {
        console.log(mosaics);
        let coin = null;
        let nemCoin = null;
        for (key in mosaics) {
          let mosaic = mosaics[key];
          if (mosaic.mosaicId.namespaceId == constvalue.NAMESPACE &&
              mosaic.mosaicId.name == constvalue.MOSAICNAME) {
            coin = mosaic;
          }
          else if (mosaic.mosaicId.namespaceId == constvalue.NEM_NAMESPACE &&
              mosaic.mosaicId.name == constvalue.NEM_MOSAICNAME) {
            nemCoin = mosaic;
          }
        }
        resolve({
          address: addressObj.value,
          balance: coin ? coin.amount : 0,
          nemBalance: nemCoin ? nemCoin.amount : 0
        });
      });
    });
};

module.exports.getInfo = getInfo
