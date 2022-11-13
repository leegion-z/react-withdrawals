import React, { useState, useEffect } from 'react';
import { IRecord } from '../types';

export const useGetData = (record: IRecord[]) => {
  const [restAmount, setRestAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  useEffect(() => {
    setRestAmount(10000);
    setInitialAmount(10000)
  }, [])
  useEffect(() => {
    if (record.length > 0) {
      const lastNum = record[record.length - 1].withdrawalsNum || 0;
      setRestAmount(restAmount - lastNum);
    }
  }, [record])
  return [initialAmount, restAmount]
}