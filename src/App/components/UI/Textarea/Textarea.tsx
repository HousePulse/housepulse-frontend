import React, {FC} from 'react';
import * as style from './Textarea.module.css'

type PropsType = {
  value: string,
  onChange: (text: string) => void,
}

const Textarea: FC<PropsType> = ({value, onChange}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [value_, setValue_] = React.useState(value);

  React.useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value_]);

  return (
    <textarea className={style.textarea}
              rows={1} ref={textareaRef}
              defaultValue={value}
              onChange={(e) => {
                setValue_(e.target.value);
                onChange(e.target.value);
              }}/>
  );
}

export default Textarea;