import { registerAs } from '@nestjs/config';
import { seconds } from '@libs/common/helper/constants/helper.function.constant';
export default registerAs(
  'auth',
  (): Record<string, any> => ({
    password: {
      saltLength: 8,
      expireIn: seconds('182d'),
    },
  }),
);
