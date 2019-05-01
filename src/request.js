import { currentSession } from './auth/UserSession'

const API_ROOT = 'http://localhost.com/smartmeal-api'


function parseJSON(response) {
  console.log(response);
  return response.json().catch(ex => {
    const error = new Error(ex)
    error.response = response
    error.jsonFailed = true
    throw error
  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  error.httpErrCode = response.status
  throw error
}

export default function request(url, options, addauth, addSign = '&') {
  const decoratedOptions = Object.assign({}, options)


  let decoratedUrl = url
  if (addauth && currentSession && currentSession.jwt) {
    decoratedOptions.headers = decoratedOptions.headers || {};
    decoratedOptions.headers.jwt = currentSession.jwt;
    if (decoratedOptions.method === 'POST') {
      decoratedOptions.body = decoratedOptions.body || {}
    }
  }

  if (decoratedOptions.body) {
    decoratedOptions.body = JSON.stringify(decoratedOptions.body)
  }


  console.log(`${API_ROOT}${decoratedUrl}`)
  return fetch(`${API_ROOT}${decoratedUrl}`, decoratedOptions) // eslint-disable-line
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
