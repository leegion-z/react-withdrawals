import React, { useState } from 'react';
import { Keyboard } from './components/Keyboard';
import { useGetData } from './hooks/useGetData';

import { calcCommission, checkAmount } from '../utils';
import type { Text, IRecord } from './types';

import './index.css';

interface Props {

}

export const Withdrawals = (props: Props) => {
  const [record, setRecord] = useState<IRecord[]>([]); // 提现记录
  const [withdrawalsVal, setWithdrawalsVal] = useState<string>(''); // 输入转账金额

  const [initialAmount, restAmount] = useGetData(record);

  const onClickNum = (text: Text) => {
    const val = withdrawalsVal + text;
    setWithdrawalsVal(checkAmount(val) ? val : withdrawalsVal);
  }

  const onDelete = () => {
    const val = withdrawalsVal.substring(0, withdrawalsVal.length - 1);
    setWithdrawalsVal(val);

  }

  const onConfirm = (num?: number) => {
    const withdrawalsNum = num || Number(withdrawalsVal);

    if (withdrawalsNum > restAmount) {
      return alert('提现金额超出余额');
    }

    if (!withdrawalsNum) {
      return
    }

    const ratesNum = calcCommission(initialAmount, restAmount, withdrawalsNum)
    alert(`提现${withdrawalsNum}元，手续费${ratesNum}元`)
    setRecord([...record, { withdrawalsNum, ratesNum }])
    setWithdrawalsVal('')

  }

  const onConfirmAll = async () => {
    if (!restAmount) return
    setWithdrawalsVal(restAmount + '');
    onConfirm(restAmount)
  }

  return (
    <div className="withdrawals">
      <div className="amount-wrap">
        <p>提现金额</p>
        <div className="input-num-wrap">
          <span>¥</span>
          <span>{withdrawalsVal}</span>
        </div>
        <p>
          当前余额{restAmount}元，
        <span className="all-withdrawals" onClick={onConfirmAll}>全部提现</span>
        </p>
      </div>
      <Keyboard onClickNum={onClickNum} onDelete={onDelete} onConfirm={() => onConfirm()} />

    </div>
  )
}