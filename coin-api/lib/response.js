/**
 * manager for response
 */

const success = function(res, message) {
  let resultValues = {};
  resultValues['application/json'] = {
    'result' : 'OK',
    'message' : message
  };
  if (Object.keys(resultValues).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      resultValues[Object.keys(resultValues)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}
module.exports.success = success

const err = function(res, err, statusCode) {
  let body = {};
  body['application/json'] = {
    'result' : 'NG',
    'message' : err.name + ': ' + err.message
  };
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body[Object.keys(body)[0]] || {}, null, 2));
}
module.exports.err = err
