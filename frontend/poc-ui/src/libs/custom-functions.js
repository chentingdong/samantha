import { Auth } from 'aws-amplify';

function formatDate ( date ) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[ monthIndex ] + ' ' + day + ', ' + year;
}

function stateColor ( state ) {
  let colorClass = '';
  switch ( state ) {
    case 'pending': colorClass = 'text-primary'; break;
    case 'active': colorClass = 'text-success'; break;
    case 'complete': colorClass = 'text-dark'; break;
    default: colorClass = 'text-secondary';
  }
  return colorClass;
}

async function currentUser () {
  let user = await Auth.currentAuthenticatedUser()
  return user;
}

export { formatDate, stateColor, currentUser };