import React, { } from 'react';

import type { Text } from '../types';
import './keyboard.css';



interface Props {
  onClickNum: (text: Text) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

const numArr: Text[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

export const Keyboard = (props: Props) => {
  const { onClickNum, onConfirm, onDelete } = props;

  return (
    <div className="keyboard">
      <div className="number-wrap">
        {numArr.map(item => <div onClick={() => { onClickNum(item) }} key={item}>{item}</div>)}
      </div>
      <div className="operate-wrap">
        <div className="delete" onClick={onDelete}>x</div>
        <div className="comfirm" onClick={onConfirm}>提现</div>
      </div>

    </div>
  )

}