import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashString = async (plaintext: string): Promise<string> => {
  return bcrypt.hash(plaintext, saltRounds);
};

export const compare = async (
  plaintext: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(plaintext, hash);
};
