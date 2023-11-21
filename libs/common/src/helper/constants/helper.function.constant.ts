import ms from 'ms';

export function seconds(msValue: string): number {
  console.log(ms(msValue));
  return ms(msValue) / 1000;
}

export function miliseconds(msValue: string): number {
  return ms(msValue);
}
