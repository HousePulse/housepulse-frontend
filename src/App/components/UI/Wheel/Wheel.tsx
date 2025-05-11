import React, {useRef, useEffect} from 'react';
import * as styles from './Wheel.module.css';

interface WheelProps<T> {
  items: T[];
  selected: T;
  onSelect: (item: T) => void;
  windowSize?: number;
  renderItem?: (item: T) => React.ReactNode;
  hideScrollBar?: boolean;
}

export function Wheel<T extends React.ReactNode>(
  {
    items,
    selected,
    onSelect,
    windowSize = 5,
    renderItem = (i: T) => <>{i}</>,
    hideScrollBar = true
  }: WheelProps<T>
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = items.indexOf(selected);
    if (idx < 0 || !containerRef.current) {
      return;
    }

    const itemHeight = containerRef.current.clientHeight / windowSize;
    containerRef.current.scrollTo({
      top: itemHeight * idx - itemHeight * Math.floor(windowSize / 2),
      behavior: 'smooth',
    });
  }, [selected, items, windowSize]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const idx = items.indexOf(selected);
    if (e.deltaY > 0 && idx < items.length - 1) onSelect(items[idx + 1]);
    if (e.deltaY < 0 && idx > 0) onSelect(items[idx - 1]);
  };

  const onClick = (item: T) => () => onSelect(item);

  return (
    <div
      className={[styles.wheel, hideScrollBar ? styles.hideScrollBar : ''].join(' ')}
      style={{height: `calc(${windowSize} * var(--wheel-item-height))`}}
      onWheel={onWheel}
      ref={containerRef}
    >
      {items.map(item => {
        const isSel = item === selected;
        return (
          <div
            key={String(item)}
            className={`${styles.wheelItem} ${isSel ? styles.selected : ''}`}
            onClick={onClick(item)}
          >
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}
