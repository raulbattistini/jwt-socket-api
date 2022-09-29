import bcrypt from "bcryptjs";

export const passwordCompareSync = (
  passwordToTest: string,
  passwordHash: string
) => bcrypt.compareSync(passwordToTest, passwordHash);
