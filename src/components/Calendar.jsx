import { useEffect, useState } from 'react';
import styles from "../styles/Calendar.module.css";
import Swal from "sweetalert2";

const Calendar = ({setStartDate, setEndDate, startDate, endDate, closedDates = [], startDateToggle = false, setStartDateToggle, setIsOpen}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDate2, setCurrentDate2] = useState(new Date(new Date(currentDate).setMonth(currentDate.getMonth() + 1)));

  const year = currentDate.getFullYear();
  const year2 = currentDate2.getFullYear();
  const month = currentDate.getMonth(); 
  const month2 = currentDate2.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfMonth2 = new Date(year2, month2, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDayOfMonth2 = new Date(year2, month2 + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const daysInMonth2 = lastDayOfMonth2.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay();
  const firstDayWeekday2 = firstDayOfMonth2.getDay();

  const previousMonthDays = firstDayWeekday !== 0 ? firstDayWeekday : 0;
  const previousMonthDays2 = firstDayWeekday2 !== 0 ? firstDayWeekday2 : 0;

  const daysArray = [];
  const daysArray2 = [];

  for (let i = 0; i < previousMonthDays; i++) {
    daysArray.push({
      day: '',
      isCurrentMonth: false,
    });
  }

  for (let i = 0; i < previousMonthDays2; i++) {
    daysArray2.push({
      day: '',
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, month: month, year: year, isCurrentMonth: true });
  }

  for (let i = 1; i <= daysInMonth2; i++) {
    daysArray2.push({ day: i, month: month2, year: year2, isCurrentMonth: true });
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setCurrentDate2(new Date(year2, month2 - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setCurrentDate2(new Date(year2, month2 + 1, 1));
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  const compareDays = (day1, day2) => {
    if(day1.year > day2.year) {
        return 1
    }
    else if(day1.year == day2.year) {
        if(day1.month > day2.month) {
            return 1
        }
        else if(day1.month == day2.month) {
            if(day1.day > day2.day) {
                return 1
            }
            else if(day1.day == day2.day) {
                return 0
            }
            else {
                return -1
            }
        }
        else {
            return -1
        }
    }
    else {
        return -1
    }
  }

  const searchInClosedDates = (dayObj) => {
    for(let i = 0; i < closedDates.length; i++) {
        if(compareDays(dayObj, closedDates[i]) == 0) return true;
    }
    return false;
  }

  const handleDayClick = (dayObj) => {
    if(startDateToggle) {
        setStartDate(dayObj);
        setStartDateToggle(false);
        if(compareDays(dayObj, endDate) == 1) setEndDate(dayObj);
        return;
    }
    if(compareDays(dayObj, {day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()}) == -1) {
        alert("No puede rentar dias anteriores a hoy.");
        return;
    }
    if(compareDays(dayObj, startDate) == 1) {
        setEndDate(dayObj);
    }
    else if(compareDays(dayObj, startDate) == -1) {
        setStartDate(dayObj);
        setEndDate({day: null, month: null, year: null});
    }
    if(startDate.day == null) {
        setStartDate(dayObj);
    }
  }

  useEffect(() => {
    if(startDate.day != null && endDate.day != null) {
        let start = new Date(startDate.year + '-' + ('0' + (startDate.month + 1)).slice(-2) + '-' + ('0' + startDate.day).slice(-2));
        let end = new Date(endDate.year + '-' + ('0' + (endDate.month + 1)).slice(-2) + '-' + ('0' + endDate.day).slice(-2));
        let arr = [];
        while(start < end) {
            start.setDate(start.getDate() + 1);
            arr.push(new Date(start));
        }
        arr = arr.map((date) => {return {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()}});
        for(let i = 0; i < arr.length; i++) {
            if(searchInClosedDates(arr[i])) {
                setStartDate({day: null, month: null, year: null});
                setEndDate({day: null, month: null, year: null});
                Swal.fire({
                    title: "¡Fecha no disponible!",
                    text: "El producto no se encuentra disponible para las fechas seleccionadas. Por favor, elige otra fecha o verifica la disponibilidad en el calendario.",
                    iconHtml: '<img src="ohNo2.png" style="width: 150px;"/>',
                })
                return;
            }
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  return (
      <div className={styles.container}>
        <span style={{position: 'absolute', top: '10px', right: '15px', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => {setIsOpen(false); setStartDateToggle(false);}}>X</span>
        <h1 className={styles.calendarTitle}>¿Cuándo es tu evento?</h1>
    <div className={styles.calendars}>
        <div style={{ textAlign: 'center', width: '320px', margin: '0', backgroundColor: 'white', padding: '10px', borderRadius: '20px 0 0 20px' }}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={handlePreviousMonth} style={{visibility: currentDate.getMonth() == new Date().getMonth() && currentDate.getFullYear() == new Date().getFullYear() ? 'none' : 'visible'}}>&lt;</button>
            <span style={{ margin: '0 15px', width: '250px' }}>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
            </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', backgroundColor: 'white' }}>
            {daysOfWeek.map((day) => (
            <div key={day} style={{ width: '40px' }}>
                {day}
            </div>
            ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white' }}>
            {daysArray.map((dayObj, index) => (
            <div
                className={(compareDays(dayObj, startDate) == 0) ? styles.selectedStart : (compareDays(dayObj, endDate) == 0) ? styles.selectedEnd : (compareDays(dayObj, startDate) == 1 && compareDays(dayObj, endDate) == -1) ? styles.between : compareDays(dayObj, {day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()}) == -1 ? styles.disabledDay : searchInClosedDates(dayObj) ? styles.disabledDay : (dayObj.isCurrentMonth ? styles.dayobj : styles.dayobj2)}
                key={index}
                onClick={() => compareDays(dayObj, {day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()}) == -1 ?  null : searchInClosedDates(dayObj) ? null : handleDayClick(dayObj)}
            >
                {dayObj.day}
            </div>
            ))}
        </div>
        </div>

        <div style={{ textAlign: 'center', width: '320px', margin: '0', backgroundColor: 'white', padding: '10px', borderRadius: '0 20px 20px 0'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <span style={{ margin: '0 15px', width: '250px' }}>
            {currentDate2.toLocaleString('default', { month: 'long' })} {year2}
            </span>
            <button onClick={handleNextMonth}>&gt;</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', backgroundColor: 'white' }}>
            {daysOfWeek.map((day) => (
            <div key={day} style={{ width: '40px' }}>
                {day}
            </div>
            ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white' }}>
            {daysArray2.map((dayObj, index) => (
            <div
                className={(compareDays(dayObj, startDate) == 0) ? styles.selectedStart : (compareDays(dayObj, endDate) == 0) ? styles.selectedEnd : (compareDays(dayObj, startDate) == 1 && compareDays(dayObj, endDate) == -1) ? styles.between : compareDays(dayObj, {day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()}) == -1 ? styles.disabledDay : searchInClosedDates(dayObj) ? styles.disabledDay : (dayObj.isCurrentMonth ? styles.dayobj : styles.dayobj2)}
                key={index}
                onClick={() => compareDays(dayObj, {day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()}) == -1 ? null : searchInClosedDates(dayObj) ? null : handleDayClick(dayObj)}
            >
                {dayObj.day}
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
  );
};

export default Calendar;