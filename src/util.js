// Func to format date into  Month DD, YYYY HH:MM AM/PM format
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

export default formatDateToLocale;
