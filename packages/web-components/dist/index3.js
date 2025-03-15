class a {
  constructor() {
    this.TOKEN_EXPIRATION = 5 * 60 * 1e3;
  }
  // 5 minutes in milliseconds
  /**
   * Generate a unique session ID
   */
  generateSessionId() {
    return this.generateRandomString(32);
  }
  /**
   * Generate a token containing the verification data
   */
  generateToken(r) {
    const e = {
      ...r,
      exp: Date.now() + this.TOKEN_EXPIRATION,
      fingerprint: this.generateFingerprint()
    };
    return this.encodeToken(e);
  }
  /**
   * Verify a token and extract its payload
   */
  verifyToken(r) {
    try {
      const e = this.decodeToken(r);
      if (e.exp < Date.now())
        return { valid: !1, error: "Token has expired" };
      if (!this.verifyFingerprint(e.fingerprint))
        return { valid: !1, error: "Invalid token fingerprint" };
      const { exp: t, fingerprint: i, ...n } = e;
      return {
        valid: !0,
        payload: n
      };
    } catch (e) {
      return {
        valid: !1,
        error: e instanceof Error ? e.message : "Invalid token"
      };
    }
  }
  /**
   * Generate a browser fingerprint
   * In a real implementation, this would use more sophisticated techniques
   */
  generateFingerprint() {
    return this.generateRandomString(16);
  }
  /**
   * Verify a browser fingerprint
   * In a real implementation, this would compare with the current browser
   */
  verifyFingerprint(r) {
    return !0;
  }
  /**
   * Encode a token payload
   */
  encodeToken(r) {
    return btoa(JSON.stringify(r));
  }
  /**
   * Decode a token
   */
  decodeToken(r) {
    try {
      return JSON.parse(atob(r));
    } catch {
      throw new Error("Invalid token format");
    }
  }
  /**
   * Generate a random string of specified length
   */
  generateRandomString(r) {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let t = "";
    const i = new Uint8Array(r);
    crypto.getRandomValues(i);
    for (let n = 0; n < r; n++)
      t += e.charAt(i[n] % e.length);
    return t;
  }
}
export {
  a as SecurityUtils
};
//# sourceMappingURL=index3.js.map
