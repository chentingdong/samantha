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
  if ( !state ) return '';

  let colorClass = '';
  switch ( state.toLowerCase() ) {
    case 'active': colorClass = 'warning'; break;
    case 'block': colorClass = 'error'; break;
    case 'complete': colorClass = 'success'; break;
    default: colorClass = 'secondary';
  }
  return colorClass;
}

function stateIcon ( state ) {
  if ( !state ) return '';

  let icon = '';
  switch ( state.toLowerCase() ) {
    case 'active': icon = 'bolt'; break;
    case 'block': icon = 'lock'; break;
    default: icon = '';
  }
  return icon;
}

export { formatDate, formatTime, stateColor, stateIcon };