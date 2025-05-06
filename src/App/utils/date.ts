/** Метки дней недели (ПН — индекс 0) */
export const WEEKDAY_LABELS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

/** Сравнение дат без учёта времени */
export function isSameDay(a: Date, b: Date): boolean {
  return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  );
}

/** Является ли дата сегодняшним днём */
export const isToday = (d: Date) => isSameDay(d, new Date());

/** Добавить N дней к дате (N может быть отрицательным) */
export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Понедельник недели, в которой лежит дата */
export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const shift = ((d.getDay() + 6) % 7); // 0=ПН … 6=ВС
  return addDays(d, -shift);
}

/** Вернуть массив дат от start до end включительно */
export function rangeDays(start: Date, end: Date): Date[] {
  const list: Date[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    list.push(new Date(d));
  }
  return list;
}

/** Интервал для календарной сетки месяца (начинается с ПН, заканчивается ВС) */
export function monthInterval(dateInMonth: Date): { start: Date; end: Date } {
  const monthStart = new Date(dateInMonth.getFullYear(), dateInMonth.getMonth(), 1);
  const monthEnd = new Date(dateInMonth.getFullYear(), dateInMonth.getMonth() + 1, 0);

  const start = startOfWeek(monthStart);
  const endShift = 6 - ((monthEnd.getDay() + 6) % 7); // сколько дней добавить до ВС
  const end = addDays(monthEnd, endShift);

  return {start, end};
}

/** Строка «05 мая», «05 мая 2025» и т.п. */
export function fmtDate(
    d: Date,
    opts: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'short'},
) {
  return new Intl.DateTimeFormat('ru-RU', opts).format(d);
}

/** Строка «Сегодня, 05 мая», «Завтра, 06 мая» или «05 мая 2025» */
export function fmtRelativeRu(target: Date, base = new Date()): string {
  const diff = Math.round((target.getTime() - base.setHours(0, 0, 0, 0)) / 86_400_000);
  if (diff === 0) return `Сегодня, ${fmtDate(target)}`;
  if (diff === 1) return `Завтра, ${fmtDate(target)}`;
  return fmtDate(target, {day: '2-digit', month: 'short', year: 'numeric'});
}

export const addMonths = (date: Date, n: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
};

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}