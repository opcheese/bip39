function SolanaBufferToAddress(pubBuf) {
  return libs.bs58.encode(pubBuf);
}