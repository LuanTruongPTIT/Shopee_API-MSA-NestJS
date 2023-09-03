const configs = {
  base: {
    JWT: {
      secret: process.env.JWT_SECRET || 'luantruong',
    },
  },
};
const config = { ...configs.base };
export { config };
