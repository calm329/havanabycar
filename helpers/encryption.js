const crypto = require('crypto');
const { encryptionSecret } = require("../secrets/secrets.js");

const decrypt = (encryptedText) => {

  if (!encryptedText) return "";

  const algorithm = 'aes-256-cbc';

  // Parse the initialization vector and encrypted message from the input string
  const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
  const encrypted = Buffer.from(encryptedText.slice(32), 'hex');

  // Create a new AES cipher with the 256-bit key and initialization vector
  const decipher = crypto.createDecipheriv(algorithm, encryptionSecret, iv);

  // Decrypt the encrypted message
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  // Return the decrypted message
  return decrypted;
};

const encrypt = (text) => {
  const algorithm = 'aes-256-cbc';

  // Generate an initialization vector
  const iv = crypto.randomBytes(16);

  // Create a new AES cipher with the 256-bit key
  const cipher = crypto.createCipheriv(algorithm, encryptionSecret, iv);

  // Encrypt the input text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return the initialization vector and encrypted message as a single string
  return iv.toString('hex') + encrypted;
};

module.exports = { encrypt, decrypt };