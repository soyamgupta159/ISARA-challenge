/* This function is used to keep track of the totals in the Load Section */
export const getTotal = (obj) => {
  let total = 0;
  for (let item in obj) {
    total = total + obj[item];
  }
  return total;
};

/* This function is used to make sure that staff member does not have more than 2 shifts per day. */
export const checkTwoShiftsPerDay = (element, day) => {
  const daysObj = element.days;
  if (daysObj[day] >= 2) {
    alert('Not more than 2 shifts in a day for w worker.');
    return false;
  } else {
    return true;
  }
};

/* This function is used to make sure that staff cannot have 2 consecutive lunch slots in a day. */
export const checkConsecutiveLunches = (shift, day, element) => {
  const arr = element.shiftType;
  let flag = 0;
  if (shift.includes('Lunch')) {
    if (arr.length === 0) {
      arr.push({ shiftName: shift, shiftDay: day });
      return true;
    } else if (arr.length > 0) {
      arr.forEach((element) => {
        let shiftFromArray = element;
        if (shiftFromArray.shiftDay === day) {
          const lastCharacterExistingEl =
            shiftFromArray.shiftName.split(' ')[1];
          const lastCharacterCurrent = shift.split(' ')[1];

          let val1 = lastCharacterExistingEl.charCodeAt(0);
          let val2 = lastCharacterCurrent.charCodeAt(0);
          let diff1 = Math.abs(val1 - val2);
          let diff2 = Math.abs(val2 - val1);

          if (diff1 === 1 || diff2 === 1) {
            console.log('stop');
            flag = 1;
            alert(
              'Cannot select consecutive lunches for same day for same worker!'
            );
            return false;
          } else {
            arr.push({ shiftName: shift, shiftDay: day });
            flag = 2;
            return true;
          }
        }
      });

      if (flag === 1) {
        return false;
      }
      if (flag === 2) {
        return true;
      }
      arr.push({ shiftName: shift, shiftDay: day });
      return true;
    }
    return true;
  }
  return true;
};

/* This function is used to make sure that staff member does not have more than 7 shifts in a week. */
export const checkShiftsPerWeek = (element) => {
  const total = element.totals;
  if (total >= 7) {
    alert('A staff member cannot have more than 7 shifts per week.');
    return false;
  } else {
    return true;
  }
};

/* This function is used to make sure that staff member is not selected to be in two places at once.. */
export const checkPlacesAtOnce = (shift, day, element) => {
  const morningArr = element.placesMorning;
  const afternoonArr = element.placesAfternoon;
  let morningFlag = 0;
  let afternoonFlag = 0;
  if (shift.includes('Lunch')) {
    return true;
  }
  if (shift.includes('Morning')) {
    if (morningArr.length === 0) {
      morningArr.push({ shiftname: shift, shiftDay: day });
      return true;
    } else if (morningArr.length > 0) {
      morningArr.forEach((element) => {
        if (element.shiftDay === day) {
          morningFlag = 0;
          alert(
            'A staff member cannot be selected to be in two places at once.'
          );
          return false;
        } else {
          morningArr.push({ shiftname: shift, shiftDay: day });
          morningFlag = 1;
          return true;
        }
      });
    }
  }
  if (shift.includes('Afternoon')) {
    if (afternoonArr.length === 0) {
      afternoonArr.push({ shiftname: shift, shiftDay: day });
      return true;
    } else if (afternoonArr.length > 0) {
      afternoonArr.forEach((element) => {
        if (element.shiftDay === day) {
          afternoonFlag = 0;
          alert(
            'A staff member cannot be selected to be in two places at once.'
          );
          return false;
        } else {
          afternoonArr.push({ shiftname: shift, shiftDay: day });
          afternoonFlag = 1;
          return true;
        }
      });
    }
  }

  if (morningFlag === 1 || afternoonFlag === 1) {
    return true;
  } else if (morningFlag === 0 || afternoonFlag === 0) {
    return false;
  }
};
