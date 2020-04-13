const { isOffline } = require("./src/utils");
const glob = require("glob");

function getConnectionOptions() {
  // had to glob and require ourselves because typeorm will complain can't import
  // prefix './' is important for require() to work properly
  // const entities = glob
  //   .sync("./src/**/entity/*.js")
  //   .map((file) => require(file));

  return {
    type: "mysql",
    host: isOffline() ? "127.0.0.1" : process.env.AURORA_HOST,
    port: isOffline() ? 3306 : process.env.AURORA_PORT,
    username: isOffline() ? "root" : process.env.USERNAME,
    password: isOffline() ? "root" : process.env.PASSWORD,
    database: isOffline() ? "samantha" : process.env.DB_NAME,
    synchronize: true,
    logging: false,
    // entities: entities,
    entities: ["./src/infra/db/entity/*.js"],
  };
}

module.exports = getConnectionOptions();
