const formatDate = (date) => {
  let fd = new Date(date);
  fd = `${fd.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}, ${fd.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  return fd;
};

export default formatDate;
