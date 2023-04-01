export default function authHeader() {
  const obj = JSON.parse(getItemFromLocalStorage("authUser"))

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}
