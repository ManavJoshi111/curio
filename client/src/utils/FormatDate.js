export const formatDate = (createdAtDateString) => {
  let createdAtDate = new Date(createdAtDateString);
  let day = createdAtDate.getDate();
  let month = createdAtDate.getMonth() + 1; // Months are zero-based
  let year = createdAtDate.getFullYear();

  // Get day of the week
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = daysOfWeek[createdAtDate.getDay()];

  // Padding day and month with leading zeros if necessary
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Extract last two digits of the year
  year = year.toString().slice(-2);

  // Construct the formatted date string
  let formattedDate = `${dayOfWeek} ${day}/${month}/${year}`;

  return formattedDate;
};
