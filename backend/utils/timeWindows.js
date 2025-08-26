// /**
//  * Get start and end dates for daily, weekly, or monthly searches.
//  * @param {string} mode - daily | weekly | monthly
//  * @param {string|Date} date - Reference date
//  * @returns {{start: Date, end: Date}}
//  */
// export const getTimeWindow = (mode = "daily", date = new Date()) => {
//   const ref = new Date(date);
//   let start, end;

//   switch (mode.toLowerCase()) {
//     case "daily":
//       start = new Date(ref.setHours(0, 0, 0, 0));
//       end = new Date(ref.setHours(23, 59, 59, 999));
//       break;
//     case "weekly": {
//       const day = ref.getDay(); // 0 = Sunday
//       const diff = ref.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
//       start = new Date(ref.setDate(diff));
//       start.setHours(0, 0, 0, 0);
//       end = new Date(start);
//       end.setDate(end.getDate() + 6);
//       end.setHours(23, 59, 59, 999);
//       break;
//     }
//     case "monthly":
//       start = new Date(ref.getFullYear(), ref.getMonth(), 1, 0, 0, 0, 0);
//       end = new Date(ref.getFullYear(), ref.getMonth() + 1, 0, 23, 59, 59, 999);
//       break;
//     default:
//       throw new Error("Invalid mode. Use daily, weekly, or monthly.");
//   }

//   return { start, end };
// };

// utils/getTimeWindow.js

/**
 * Returns start and end Date objects for a given mode and date
 * @param {"daily"|"weekly"|"monthly"} mode - Time filter mode
 * @param {string|Date} date - Target date in YYYY-MM-DD or Date object
 * @returns {{ start: Date, end: Date }}
 */
export function getTimeWindow(mode = "daily", date = new Date()) {
  const target = new Date(date);

  // Normalize time to midnight for start
  target.setHours(0, 0, 0, 0);

  let start, end;

  if (mode === "daily") {
    start = new Date(target);
    end = new Date(target);
    end.setHours(23, 59, 59, 999);

  } else if (mode === "weekly") {
    const day = target.getDay(); // 0 = Sunday, 1 = Monday, ...
    const diffToMonday = (day === 0 ? -6 : 1) - day; // Adjust for Monday start
    start = new Date(target);
    start.setDate(start.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);

    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

  } else if (mode === "monthly") {
    start = new Date(target.getFullYear(), target.getMonth(), 1);
    end = new Date(target.getFullYear(), target.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

  } else {
    throw new Error(`Invalid mode "${mode}" provided. Use daily, weekly, or monthly.`);
  }

  return { start, end };
}
