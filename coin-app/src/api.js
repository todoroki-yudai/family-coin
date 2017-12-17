/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = 'http://localhost:18080/api/v1.0'
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  // console.log(config);

  // axios.get('http://localhost:18080/api/v1.0/users/me', {
  //   token: 'X-CSRF-Token',
  //   withCredentials: true
  // })

  // var instance = axios.create({
  //   baseURL: 'http://localhost:18080/api/v1.0'
  // })
  // instance.defaults.headers.common['token'] = 'aaa';
  // instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  // instance.get(queryUrl, {
  //   params: form
  // }, config)

  // axios[method]('http://localhost:18080/api/v1.0/users/me',
  //   { 'token': 'aa'},
  //   { headers: { 'token': 'aaa' } }
  // )
  // .then((response => {
  //   console.log(response.data);
  // }))
  // .catch((error) => {
  //   console.log(error);
  // });

  if (body) {
    return axios[method](queryUrl, body, config)
  } else if (method === 'get') {
    return axios[method](queryUrl, {
      params: form
    }, config)
  } else {
    return axios[method](queryUrl, qs.stringify(form), config)
  }
}
/*==========================================================
 *                    Family Point API
 ==========================================================*/
/**
 * user login
 * request: post__users_login
 * url: post__users_loginURL
 * method: post__users_login_TYPE
 * raw_url: post__users_login_RAW_URL
 * @param method - designate facebook or mail_address.
 * @param mail - email address.
 * @param password - plain password user entered.
 * @param openidAccessToken - Access token sent from OAuth Server
 */
export const post__users_login = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/login'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['method'] !== undefined) {
    form['method'] = parameters['method']
  }
  if (parameters['method'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: method'))
  }
  if (parameters['mail'] !== undefined) {
    form['mail'] = parameters['mail']
  }
  if (parameters['password'] !== undefined) {
    form['password'] = parameters['password']
  }
  if (parameters['openidAccessToken'] !== undefined) {
    form['openid_access_token'] = parameters['openidAccessToken']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const post__users_login_RAW_URL = function() {
  return '/users/login'
}
export const post__users_login_TYPE = function() {
  return 'post'
}
export const post__users_loginURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/login'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: get__users_me
 * url: get__users_meURL
 * method: get__users_me_TYPE
 * raw_url: get__users_me_RAW_URL
 * @param token - Use this access token to access the API server
 */
export const getUsersMe = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  // console.log(config);
  let path = '/users/me'
  let body
  let queryParameters = {}
  let form = {}
  // if (parameters['token'] === undefined) {
  //   return Promise.reject(new Error('Missing required  parameter: token'))
  // }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const get__users_me_RAW_URL = function() {
  return '/users/me'
}
export const get__users_me_TYPE = function() {
  return 'get'
}
export const get__users_meURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/me'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: post__users_me_logout
 * url: post__users_me_logoutURL
 * method: post__users_me_logout_TYPE
 * raw_url: post__users_me_logout_RAW_URL
 * @param token - Use this access token to access the API server
 */
export const post__users_me_logout = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/me/logout'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['token'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: token'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const post__users_me_logout_RAW_URL = function() {
  return '/users/me/logout'
}
export const post__users_me_logout_TYPE = function() {
  return 'post'
}
export const post__users_me_logoutURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/me/logout'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: get__users_me_points
 * url: get__users_me_pointsURL
 * method: get__users_me_points_TYPE
 * raw_url: get__users_me_points_RAW_URL
 * @param type -
 * @param token - Use this access token to access the API server
 */
export const get__users_me_points = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/me/points/{type}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{type}', `${parameters['type']}`)
  if (parameters['type'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: type'))
  }
  if (parameters['token'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: token'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const get__users_me_points_RAW_URL = function() {
  return '/users/me/points/{type}/'
}
export const get__users_me_points_TYPE = function() {
  return 'get'
}
export const get__users_me_pointsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/me/points/{type}/'
  path = path.replace('{type}', `${parameters['type']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * v0.1+ | Get transaction's record for each user
 * request: get__users_me_transactions
 * url: get__users_me_transactionsURL
 * method: get__users_me_transactions_TYPE
 * raw_url: get__users_me_transactions_RAW_URL
 * @param token - Use this access token to access the API server
 */
export const getUsersMeTransactions = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/me/transactions'
  let body
  let queryParameters = {}
  let form = {}
  // if (parameters['token'] === undefined) {
  //   return Promise.reject(new Error('Missing required  parameter: token'))
  // }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const get__users_me_transactions_RAW_URL = function() {
  return '/users/me/transactions'
}
export const get__users_me_transactions_TYPE = function() {
  return 'get'
}
export const get__users_me_transactionsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/me/transactions'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * send coins to someone
 * request: post__thanks_send
 * url: post__thanks_sendURL
 * method: post__thanks_send_TYPE
 * raw_url: post__thanks_send_RAW_URL
 * @param receivedAddress -
 * @param amount -
 * @param message -
 * @param token - Use this access token to access the API server
 */
export const postThanksSend = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/thanks/send'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['receivedAddress'] !== undefined) {
    form['received_address'] = parameters['receivedAddress']
  }
  if (parameters['receivedAddress'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: receivedAddress'))
  }
  if (parameters['amount'] !== undefined) {
    form['amount'] = parameters['amount']
  }
  if (parameters['amount'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: amount'))
  }
  if (parameters['message'] !== undefined) {
    form['message'] = parameters['message']
  }
  if (parameters['message'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: message'))
  }
  // if (parameters['token'] === undefined) {
  //   return Promise.reject(new Error('Missing required  parameter: token'))
  // }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const post__thanks_send_RAW_URL = function() {
  return '/thanks/send'
}
export const post__thanks_send_TYPE = function() {
  return 'post'
}
export const post__thanks_sendURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/thanks/send'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
