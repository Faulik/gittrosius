import 'isomorphic-fetch';
import { local } from 'services';

const API_ROOT = 'https://api.gitter.im/v1/'

const encodeToUrlEncoded = (data) => {
  return Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}

function callApi(method, endpoint, data = undefined) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + local.getAuthToken()
  });

  const body = data ? encodeToUrlEncoded(data) : undefined

  return fetch(fullUrl, {
      method,
      headers,
      mode: 'cors',
      body: body || undefined
    })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )
}

// api services
export const fetchUser = () => callApi('get', 'user')
