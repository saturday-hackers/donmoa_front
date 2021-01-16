import React, { useState } from "react";
import { Button } from "doodlin-design-system";
import "../../style/Calendar/index.scss";
import { makeDayId } from "../../utils/format";
import moment from "moment";

const makeTable = (
  year: number,
  month: number,
  selectDayId: string,
  setSelectDayId: (param: string) => void
) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const table: any[][] = [[], [], [], [], [], [], []];

  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay();

  table.forEach((week, index) => {
    week.push(
      <div className="date-name" key={`dateName${index}`}>
        {days[index]}
      </div>
    );
  });

  let prevDay = startDay - 1;
  let prevDate = new Date(year, month, 0).getDate();

  while (prevDay >= 0) {
    table[prevDay].push(
      <div className="day prev" key={prevDate}>
        {prevDate}
      </div>
    );
    prevDate = prevDate - 1;
    prevDay = prevDay - 1;
  }

  for (let i = 1; i <= lastDate; i += 1) {
    const dayObj = new Date(year, month, i);
    const newDayId = makeDayId(dayObj);
    const isToday = newDayId === makeDayId(new Date());
    const isSelect = selectDayId === makeDayId(dayObj);

    table[dayObj.getDay()].push(
      <div
        key={newDayId}
        className={`day ${isSelect ? "select" : ""} ${isToday ? "today" : ""}`}
        onClick={() => {
          setSelectDayId(newDayId);
        }}
      >
        {i}
      </div>
    );
  }

  let nextDay = lastDay + 1;
  let nextDate = 1;

  while (nextDay <= 6) {
    table[nextDay].push(
      <div className="day next" key={nextDay}>
        {nextDate}
      </div>
    );
    nextDate = nextDate + 1;
    nextDay = nextDay + 1;
  }

  if (table[0].length < 7) {
    for (let i = 0; i < 7; i += 1) {
      table[i].push(
        <div className="day next" key={nextDay}>
          {nextDate}
        </div>
      );
      nextDate = nextDate + 1;
    }
  }

  return table.map((week, index) => {
    return (
      <div key={index} className={`table ${days[index]}`}>
        {week}
      </div>
    );
  });
};

const Calendar: React.FC = () => {
  const [selectDayId, setSelectDayId] = useState<string>("");
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());

  const prevMonth = () => {
    if (month >= 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(11);
    }
  };

  const nextMonth = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(0);
    }
  };

  const table = makeTable(year, month, selectDayId, setSelectDayId);

  return (
    <div className="Calendar">
      <div className="content">
        <div className="year">{year}</div>
        <div className="calendar-flex">
          <Button onClick={prevMonth} size="xs">
            &#xE000;
          </Button>
          <div className="month">{month + 1}월</div>
          <Button onClick={nextMonth} size="xs">
            &#xE001;
          </Button>
        </div>
        <div className="calendar-table">{table}</div>
      </div>
    </div>
  );
};

export default Calendar;
