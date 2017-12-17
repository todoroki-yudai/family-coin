'use strict';

exports.post__thanks_send = function(args, res, next) {
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
  var examples = {};
  examples['application/json'] = {
  "result" : "OK",
  "message" : ""
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

