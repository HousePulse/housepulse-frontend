import React, {FC} from 'react';
import * as style from './Textarea.module.css'

type PropsType = {
  text: string
}

const Textarea: FC<PropsType> = ({text}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = React.useState(text);

  React.useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return (
      <textarea className={style.textarea}
                rows={1} ref={textareaRef}
                defaultValue={text}
                onChange={(e) => setValue(e.target.value)}/>
  );
}

export default Textarea;