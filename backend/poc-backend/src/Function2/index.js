// if aws sam local is set to true, use host.docker.internal DNS name to access
// services running locally (localhost) otherwise, use the RDS DB address as the host
const dbHost = process.env.AWS_SAM_LOCAL === 'true' ? 'host.docker.internal' : process.env.DB_ADDRESS;

const mysql = require('serverless-mysql')({
  config: {
    host: dbHost,
    user: 'root',
    password: 'password',
    database: 'mysql'
    }
})

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  let results = await mysql.query('select 1')
  await mysql.end()
  console.log(results);

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event, undefined, 2)
  };
  
  return response;

};
