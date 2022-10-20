import Cookies from 'js-cookie';

export const CookieTags = {
    userName: 'userName',
    userEmail: 'userEmail',
    profilePicture: 'profilePicture',
    tokenId: 'tokenId',
};

const setCookie = (tag, value) => {
    Cookies.set(tag, value, { expires: 1 });
}

const setTokenId = (tokenId) => {
    setCookie(CookieTags.tokenId, tokenId);
}

const getCookie = (cookieTag) => Cookies.get(cookieTag)

const removeAllCookies = () => {
    Object.values(CookieTags).forEach((tag) => {
        Cookies.remove(tag);
    })
};

const CookiesHelper = { setTokenId, getCookie, removeAllCookies, setCookie };

export default CookiesHelper;