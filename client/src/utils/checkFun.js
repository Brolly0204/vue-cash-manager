import jwtDecode from 'jwt-decode'

const isEmpty = value => (value === undefined || value === null
  || (typeof value === 'string' && value.trim().length === 0)
  || Object.keys(value).length === 0)


const decodeToken = token => (jwtDecode(token))

export default {
  isEmpty,
  decodeToken
}
