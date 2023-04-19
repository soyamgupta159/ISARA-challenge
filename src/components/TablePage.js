import Table from '../components/Table';
import { useState } from 'react';
import Button from './Button';
import '../styles.css';
import {
  getTotal,
  checkTwoShiftsPerDay,
  checkConsecutiveLunches,
  checkShiftsPerWeek,
  checkPlacesAtOnce,
} from '../utils';

/* This page serves ar the parent for this app and data is passed to the child components via props and some data is shared among the siblings using this component. */

/* This data serves as the state for for the Load section, this can also be saved on the json server and can be fetched, updated and deleted with every state update using http calls(Axios) but due to the 2 hours time constraint I am keeping it here outside the component. */

let someData = [
  {
    name: 'X1',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X2',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X3',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X4',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X5',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X6',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
  {
    name: 'X7',
    days: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
    shiftType: [],
    totals: 0,
    placesMorning: [],
    placesAfternoon: [],
  },
];

/* The comoponent starts here */
function TablePage() {
  const [staffData, setStaffData] = useState(someData);
  const [reset, setReset] = useState(false);
  const options = [
    { label: 'X1', value: 'x1' },
    { label: 'X2', value: 'x2' },
    { label: 'X3', value: 'x3' },
    { label: 'X4', value: 'x4' },
    { label: 'X5', value: 'x5' },
    { label: 'X6', value: 'x6' },
    { label: 'X7', value: 'x7' },
  ];
  const data = [
    { name: 'Morning UpStairs' },
    { name: 'Morning Down Stairs' },
    { name: 'Morning Parking Lot' },
    { name: 'Lunch A' },
    { name: 'Lunch B' },
    { name: 'Lunch C' },
    { name: 'Lunch D' },
    { name: 'Afternoon Up Stairs' },
    { name: 'Afternoon Down Stairs' },
    { name: 'Afternoon Parking Lot' },
  ];
  const headers = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  /* This function is the heart of this code. */
  const mainFunction = (val, shift, day, resetState) => {
    let checkLunches;
    let checkDayShifts;
    let checkWeekShifts;
    let checkPlaces;
    /* Conditions for all the criterias asked to be implemented in the challenge. */
    if (val && shift && day && val !== 'X') {
      someData = someData.map((element) => {
        if (element.name === val) {
          checkLunches = checkConsecutiveLunches(shift, day, element);
          checkDayShifts = checkTwoShiftsPerDay(element, day);
          checkWeekShifts = checkShiftsPerWeek(element);
          checkPlaces = checkPlacesAtOnce(shift, day, element);
          if (
            !checkLunches ||
            !checkDayShifts ||
            !checkWeekShifts ||
            !checkPlaces
          ) {
            resetState();
          }
          if (
            checkLunches &&
            checkDayShifts &&
            checkWeekShifts &&
            checkPlaces
          ) {
            setReset(false);
            element.days[day] = element.days[day] + 1;
            element.totals = getTotal(element.days);
          }
          return element;
        }
        return element;
      });

      const index = someData.findIndex((el) => {
        return el.name === val;
      });

      /* State Update */
      setStaffData((prev) => {
        const arr = [...prev];
        arr[index] = {
          ...prev[index],
          days: { ...prev[index].days, ...someData[index].days },
          totals: someData[index].totals,
        };
        return arr;
      });
    }
  };

  /* Resetting the form  */
  const handleClearClick = () => {
    staffData.forEach((el, index) => {
      setStaffData((prev) => {
        const arr = [...prev];
        arr[index] = {
          ...prev[index],
          totals: 0,
          days: {
            ...prev[index].days,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
          },
        };
        return arr;
      });
    });
    setReset(true);
  };

  /* Re-using the table component for both the 'Schedule' and the 'Load' sections. */
  return (
    <div>
      <Table
        reset={reset}
        data={data}
        headers={headers}
        options={options}
        handleMain={mainFunction}
      ></Table>
      <br />
      <Table
        data={staffData}
        headers={headers}
        firstHeader={'Staff Member'}
        lastHeader={'Totals'}
      ></Table>
      <Button handleClick={handleClearClick}>Clear</Button>
    </div>
  );
}

export default TablePage;
