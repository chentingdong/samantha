module.exports = {
  client: {
    service: {
      name: "samantha-hasura",
      url: "http://localhost:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey"
      }
    }
  }
};
