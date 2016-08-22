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

  const body = data ? JSON.stringify(data) : undefined

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
export const fetchUserRooms = (userId) => callApi('get', `user/${userId}/rooms`)
export const fetchRooms = () => callApi('get', 'rooms')
export const fetchRoomMessages = (roomId, limit=50) => callApi('get', `rooms/${roomId}/chatMessages?limit=${limit}`)
export const postMessage = (roomId, text) => callApi('post', `rooms/${roomId}/chatMessages`, { text })
