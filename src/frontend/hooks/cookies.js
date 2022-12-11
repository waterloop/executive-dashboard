import Cookies from 'js-cookie';

const CookieTags = {
    userName: 'userName',
    userEmail: 'userEmail',
    profilePicture: 'profilePicture',
    tokenId: 'tokenId',
    accessToken: 'accessToken',
};

const setCookie = (tag, value) => {
    Cookies.set(tag, value, { expires: 1 });
}

const setUserName = (userName) => {
    setCookie(CookieTags.userName, userName);
}

const setUserEmail = (email) => {
    setCookie(CookieTags.userEmail, email);
}

const setProfilePic = (pic) => {
    setCookie(CookieTags.profilePicture, pic);
}

const setTokenId = (tokenId) => {
    setCookie(CookieTags.tokenId, tokenId);
}

const setAccessToken = (accessToken) => {
    setCookie(CookieTags.accessToken, accessToken);
}

const getCookie = (cookieTag) => Cookies.get(cookieTag)

const removeAllCookies = () => {
    Object.values(CookieTags).forEach((tag) => {
        Cookies.remove(tag);
    })
};

const CookiesHelper = { CookieTags, setUserName, setUserEmail, setProfilePic, setTokenId, getCookie, removeAllCookies, setCookie, setAccessToken };

export default CookiesHelper;