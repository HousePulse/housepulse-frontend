import React, {FC, memo} from 'react';
import * as style from './Checkbox.module.css'

type Props = {
  onChange: (...args: any[]) => any,
}

const Checkbox: FC<Props> = memo(({onChange}) => {

  return (
    <label className={style.checkboxWrapper}>
      <input type="checkbox" onChange={onChange}/>
      <div className={style.checkboxSlider}>
        <div className={style.checkboxKnob}></div>
      </div>
    </label>
  );
});

export default Checkbox;