export interface IHelperHashService {
  randomSalt(length: number): string;
  bcrypt(password: string, salt: string): string;
  bcryptCompare(passwordString: string, passwordHashed: string): boolean;
  sha256(string: string): string;
}
