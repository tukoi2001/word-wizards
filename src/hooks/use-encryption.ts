import * as CryptoJS from 'crypto-js';

export default function useEncryption() {
  const ENCRYPT_KEY = 'word-wizards';

  const encrypt = (text: string): string => {
    try {
      return CryptoJS.AES.encrypt(text, ENCRYPT_KEY).toString();
    } catch (error) {
      return '';
    }
  };

  const decrypt = (encryptedText: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPT_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '';
    }
  };

  return { encrypt, decrypt };
}
