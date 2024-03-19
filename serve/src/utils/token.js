const TOKEN = "token";

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function removeToken() {
    localStorage.removeItem(TOKEN);
}

export function encrypt(str) {
    if (!(typeof str === 'string')) {
        str = JSON.stringify(str);
    }
    return btoa(encodeURIComponent(str));
}

export function decrypt(str) {
    return JSON.parse(decodeURIComponent(atob(str)));
}