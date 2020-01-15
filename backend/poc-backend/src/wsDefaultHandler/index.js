exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  
  let message = '';
  let action = '';
  try {
      message = JSON.parse(event.body);
      console.log(message);
      action = message.action || '';
  } catch (e) {
      console.log(e);
  }
  return {
    body: `action: ${action}`
  };
};
