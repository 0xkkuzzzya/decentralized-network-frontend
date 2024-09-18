import CryptoJS from 'crypto-js';

export const generateRandomKey = (length: number): string => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

const secretKey = generateRandomKey(32); 

export const encryptUrl = (url: string): string => {
    return CryptoJS.AES.encrypt(url, secretKey).toString();
};

export const decryptUrl = (encryptedUrl: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
