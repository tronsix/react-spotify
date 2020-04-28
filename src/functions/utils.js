// Get the hash params of the url
export const hash =
  window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

// Generate a random string, we'll use this to set the state param of our api request
export function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// shortens get and set statement for sessionStorage
export function getItem(item){
  return sessionStorage.getItem(item)
}
export function setItem(item, string){
  return sessionStorage.setItem(item, string)
}