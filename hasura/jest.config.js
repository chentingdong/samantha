process.env.HASURA_GRAPHQL_ENDPOINT = "http://localhost:8080"

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(test).ts"],
}
