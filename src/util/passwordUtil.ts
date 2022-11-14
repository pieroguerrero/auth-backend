import bcrypt from "bcryptjs";

/**
 * Provides methods that work togueter to Encryp and Validate a password.
 */
const passwordUtil = {
  async encryptPassword(uncryptedString: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(uncryptedString, salt);
  },
  /**
   * By using 'bcrypt', compares a provided String to be compared agains a password.
   * @param nonEncryptedString - Non-encrypted string to be compared.
   * @param encryptedPassword - Encrypted password that was previously encrypted with the 'encryptPassword' method.
   */
  async validatePassword(
    nonEncryptedString: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(nonEncryptedString, encryptedPassword);
  },
};

export { passwordUtil };
