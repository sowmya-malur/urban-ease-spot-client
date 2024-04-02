/**
 * Func to format date into  Month DD, YYYY HH:MM AM/PM format
 * @param {timeStamp} timeStamp  start and/or end time stamp
 * @returns {Date} date
 */
const formatDateToLocale = (timeStamp) => {
  const date = new Date(timeStamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

/**
 * Func to convert timestamp to ISO, compatible with database format - "YYYY-MM-DD HH:MM:SS"
 * @param {timeStamp} timeStamp start and/or end time stamp
 * @returns {String} in the specified format
 */
const formatToISO = (timeStamp) => {
  const date = new Date(timeStamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Func to format duration in HH:MM:SS
 * @param {selectedHours} selectedHours hours selected by the user
 * @param {selectedMins} selectedMins minutes selected by the user
 * @returns {String} string in specified format
 */
const formatDuration = (selectedHours, selectedMins) => {
  // convert hours and mins to seconds
  const durationInSeconds = selectedHours * 3600 + selectedMins * 60;

  // convert into milliseconds
  const durationInMilli = new Date(durationInSeconds * 1000);

  // Extract hours, minutes, and seconds from durationInMilli
  const hours = durationInMilli.getUTCHours().toString().padStart(2, "0");
  const minutes = durationInMilli.getUTCMinutes().toString().padStart(2, "0");
  const seconds = durationInMilli.getUTCSeconds().toString().padStart(2, "0");

  // format "HH:MM:SS"
  return `${hours}:${minutes}:${seconds}`;
};

export { formatDateToLocale, formatToISO, formatDuration };
