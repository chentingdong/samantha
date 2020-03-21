function formatDate ( date ) {
  let d = new Date( date );

  var dateString = d.getUTCFullYear() + "-"
    + ( d.getUTCMonth() + 1 ) + "-" + d.getUTCDate();


  return dateString;
}

function formatTime ( timestamp ) {
  let t = new Date( timestamp );

  var timeString = formatDate( t ) + " "
    + t.getUTCHours() + ":" + t.getUTCMinutes() + ":" + t.getUTCSeconds();


  return timeString;
}

function stateColor ( state ) {
  let colorClass = '';
  if ( !state ) return '';

  switch ( state.toLowerCase() ) {
    case 'active': colorClass = 'text-warning'; break;
    case 'complete': colorClass = 'text-dark'; break;
    default: colorClass = 'text-secondary';
  }
  return colorClass;
}

export { formatDate, formatTime, stateColor };