const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'i8TQDTO1Bj7D0CJWTS4ytGkBHOFEanyXv8x2hRyzC02JoZvHb5dAzu3q';
const initVector = crypto.randomBytes(16);

const encrypt = (text) => {
   // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return  encryptedData;
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(hash, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return  decryptedData;
};

module.exports = {
    encrypt,
    decrypt
};