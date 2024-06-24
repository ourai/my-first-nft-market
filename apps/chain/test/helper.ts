export const INITIAL_SUPPLY = 1_000_000;
export const COIN_DECIMALS = 2;
export const TOKEN_ID = 1;
export const TOKEN_ID_2ND = 2;
export const TOKEN_ID_3RD = 3;
export const OURAI_AVATAR = 'https://linxoid.com/assets/people/ourai/avatar-486ed9e17caab1f80862dbf4169304272febc00213347731af5980055148b1e7.jpg';

export function resolveAmount(amountWithoutDecimals: number, decimals: number | bigint = COIN_DECIMALS) {
  return amountWithoutDecimals * Math.pow(10, Number(decimals));
}
