import { registerAs } from '@nestjs/config';
import { seconds } from '../helper/constants/helper.function.constant';
export default registerAs(
  'helper',
  (): Record<string, any> => ({
    salt: {
      length: 8,
    },
    jwt: {
      defaultSecretKey: '123456',
      defaultExpirationiTme: seconds('1h'),
      notBeforeExpirationTime: seconds('0'),
    },
  }),
);
