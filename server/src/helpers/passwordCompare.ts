import { compareSync } from "bcryptjs";

export const passwordCompareSync = (
  passwordToTest: string,
  passwordHash: string
) => compareSync(passwordToTest, passwordHash);
