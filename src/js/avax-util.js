function AvalancheXBufferToAddress(pubBuf, hrp="avax", chainId="X") {
  const sha256_ed = libs.createHash("sha256").update(pubBuf).digest();
  const ripemd160_ed = libs.createHash("rmd160").update(sha256_ed).digest();
  // https://github.com/ava-labs/avalanchejs/blob/9ee051c64c68af42ac5d7c4aca4fc792795e6f7b/src/utils/bintools.ts#L319
  return `${chainId}-${libs.bech32.encode(hrp, libs.bech32.toWords(ripemd160_ed))}`;
}

function cb58Encode(buf) {
  const Buffer = libs.buffer.Buffer;
  const hashSlice = Buffer.from(libs.createHash('sha256').update(buf).digest().slice(28));
  const newBuf = Buffer.concat([buf, hashSlice]);
  return libs.bs58.encode(newBuf);
}

function AvalancheXBufferToPublic(pubBuf) {
  return cb58Encode(pubBuf);
}

function AvalancheXBufferToPrivate(privBuf) {
  return `PrivateKey-${cb58Encode(privBuf)}`;
}
