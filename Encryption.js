const crypto = require("crypto");
const secret = `${process.env.SECRET_KEY}`;

const encrypt = (passwordData) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(passwordData.password),
    cipher.final(),
  ]);
  const result = JSON.stringify({
    ...passwordData,
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  })
  return result;
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt };