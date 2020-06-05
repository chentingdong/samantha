function formatDate(date) {
  let d = new Date(date);

  var dateString =
    d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();

  return dateString;
}

function formatTime(timestamp) {
  let t = new Date(timestamp);
  var timeString =
    t.getUTCHours() + ":" + t.getUTCMinutes() + ":" + t.getUTCSeconds();
  return timeString;
}

function formatDateTime(timestamp) {
  let t = new Date(timestamp);
  var timeString = formatDate(t) + " " + formatTime(t);
  return timeString;
}

function stateColor(state) {
  if (!state) return "";

  let colorClass = "";
  switch (state) {
    case "Active":
      colorClass = "green";
      break;
    case "Pending":
      colorClass = "danger";
      break;
    case "Complete":
      colorClass = "success";
      break;
    default:
      colorClass = "warning";
  }
  return colorClass;
}

function stateIcon(state) {
  if (!state) return "";

  let icon = "";
  switch (state) {
    case "Active":
      icon = "bolt";
      break;
    case "Pending":
      icon = "lock";
      break;
    case "Complete":
      icon = "check";
      break;
    default:
      icon = "cog";
  }
  return icon;
}

export { formatDate, formatTime, formatDateTime, stateColor, stateIcon };
