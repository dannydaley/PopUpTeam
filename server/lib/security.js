const crypto = require('crypto');

const salt = crypto.randomBytes(256).toString('hex'); // create a hash salt/pepper
const iterations = 1000; // number of iterations to jumble the hash
const hashSize = 64; //set up char length of hash
const hashAlgorithm = "sha256"; // which hashing algorithm will be used

//This function returns a hash of the password, combined with the pepper and the salt.
function PasswordHash(password, salt) {
  //PEPPER MUST BE MOVED TO ENV FILE WHEN READY
  const pepper =
    'ec3fd71d14f7cab570fc94df34e60e4d8c80cdff4d1dde66c74b10ae576b88239315295adabaced63b05104bbf8d2f2f92a24aeebe8444861ba1b7efc73dafdeda6fe2bf6e7288f959832d5db953a7eab0b37ef8ad126f94616b0c1e7b3b0ce7418dff91afaa78401dacce6aee72649840e26a01d75bfac69acf8d0dd50aaddebb9397150bb0f88795cde94ea3d03fec2992fc3b5c3c7bbd8de3f8f7d693cdcca879d9aefd6e02d4457217928091a731c08f83f9927f9b19ca34ab589dd02ecc40e336e067a1f2e072ec2b3a93617ded73028ed5bc5d55f011ba5a53099312f06d649fa06fdbf49e81c8f9a81f113f95cd16d230c2cb6056189c77f889dc83d';

  return crypto
    .pbkdf2Sync(password, salt + pepper, iterations, hashSize, hashAlgorithm)
    .toString('hex');
}

module.exports = { PasswordHash, salt };