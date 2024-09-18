import CryptoJS from 'crypto-js';

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex'); //secret key

export const encryptUrl = (url: string): string => {
    return CryptoJS.AES.encrypt(url, secretKey).toString();
};

export const decryptUrl = (encryptedUrl: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
