export const envConfig = {
  jwtSecretEmailVerify: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
  emailVerifyTokenExpiresIn: process.env.Email_Verify_Token_ExpiresIn as string,
};
