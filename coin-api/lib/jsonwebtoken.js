/**
 * manager for json web token
 */

var moment = require( 'moment' );
var jwt = require( 'jsonwebtoken' );

var models = require('../lib/models');

const expiresInHours = 24 * 7 // 1 week

const createAccessToken = function(user) {
  if(!(user instanceof models.User)) {
    throw new Exception('user parameter must be User Class')
  }
  payload = {
    'username': user.username,
    'email': user.email,
    'address': user.address
  }
  let token = jwt.sign( payload, process.env.SUPERSECRET, {
    expiresIn: expiresInHours.toString() + 'h'
  });
  return {
    token: token,
    expiresIn: moment().add('hours', expiresInHours).format('YYYY-MM-DD HH:mm:ss')
  };
}
module.exports.createAccessToken = createAccessToken

const verifyAccessToken = function(token) {
  //. 設定されていたトークンの値の正当性を確認
  return jwt.verify( token, process.env.SUPERSECRET, function(err, decoded){
    if(err){
      console.log(err);
      return null;
    }
    return decoded;
  });
}
module.exports.verifyAccessToken = verifyAccessToken
