import { commissionStart, rates } from './consts';
import Big from 'big.js';

// 输入校验
export const checkAmount = (val: string) => {
  const valArr = val.split('.');
  if (valArr.length > 2) {
    return false;
  }
  if (valArr[1] && valArr[1].length > 2) {
    return false;
  }
  return true
}

// 计算手续费
export const calcCommission = (initialAmount: number, restAmount: number, withdrawalsNum: number) => {
  let premium = 0; // 手续费

  if (new Big(initialAmount).minus(restAmount).toNumber() > commissionStart) {
    // 全超出
    premium = new Big(rates).times(withdrawalsNum).toNumber();
  } else if (new Big(initialAmount).minus(restAmount).plus(withdrawalsNum).toNumber() < commissionStart) {
    // 不超出
    premium = 0
  } else {
    const needPremium = new Big(withdrawalsNum).plus(initialAmount).minus(restAmount).minus(commissionStart).toNumber();
    premium = new Big(rates).times(needPremium).toNumber();
  }
  return premium
}