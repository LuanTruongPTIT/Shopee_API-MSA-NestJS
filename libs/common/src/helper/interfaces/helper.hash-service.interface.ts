export interface IHelperHashService {
  randomSalt(length: number): string;
  bcrypt(password: string, salt: string): string;
  bcryptCompare(passwordString: string, passwordHashed: string): boolean;
}
