module.exports = {
  client: {
    service: {
      name: "samantha-hasura",
      url: "http://localhost:8080/v1/graphql",
      // url: "https://poc.dev.bellhop.io/v1alpha1/graphql",
      headers: {
        "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
      },
    },
  },
}
