import React, { Component } from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import buildHasuraProvider from "./ra-data-hasura-graphql";
import users from "./users";
import bellhops from "./bellhops";
import bellhop_memberships from "./bellhop_memberships";
import { HttpLink } from "apollo-client-preset";
import buildApolloClient from "./ra-data-graphql/buildApolloClient";

const link = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
  },
});

const knownResources = [
  "m2_bells",
  "m2_blocks",
  "m2_form_tasks",
  "m2_goal_executors",
  // "m2_membership_roles",
  // "m2_participation_roles",
];

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  async componentDidMount() {
    const client = buildApolloClient({ link });
    buildHasuraProvider({ client }).then((dataProvider) =>
      this.setState({ dataProvider })
    );
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="m2_users" options={{ label: "Users" }} {...users} />
        <Resource
          name="m2_bellhops"
          options={{ label: "Bellhops" }}
          {...bellhops}
        />
        <Resource
          name="m2_bellhop_memberships"
          options={{ label: "Bellhop Memberships" }}
          {...bellhop_memberships}
        />
        {knownResources.map((resource) => (
          <Resource
            name={resource}
            show={ShowGuesser}
            key={resource}
            options={{ label: resource.substr(3) }}
          />
        ))}
      </Admin>
    );
  }
}

export default App;
