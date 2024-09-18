import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Замените на свой секретный ключ

export const encryptUrl = (url: string): string => {
    return CryptoJS.AES.encrypt(url, secretKey).toString();
};

export const decryptUrl = (encryptedUrl: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};