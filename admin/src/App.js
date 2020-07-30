import React, { Component } from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import buildHasuraProvider from "./ra-data-hasura-graphql";
import users from "./users";
import bellhops from "./bellhops";
import bells from "./bells";
import blocks from "./blocks";
import tasks from "./tasks";
import goals from "./goals";
import bell_executors from "./bell_executors";
import bellhop_memberships from "./bellhop_memberships";
import bellhop_bell_participations from "./bellhop_bell_participations";
import { HttpLink } from "apollo-client-preset";
import buildApolloClient from "./ra-data-graphql/buildApolloClient";
import Dashboard from "./Dashboard";

const link = new HttpLink({
  uri: `${window.location.protocol}//${window.location.hostname}:8080/v1/graphql`,
  headers: {
    "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
  },
});

const apolloClient = buildApolloClient({ link });

const knownResources = [
  "m2_block_type",
  "m2_block_state",
  "m2_goals",
  "m2_goal_executors",
  "m2_membership_roles",
  "m2_participation_roles",
  "m2_user_bell_participations",
  "m2_user_block_participations",
];

const dataProviderDecorator = (requestHandler) => (type, resource, params) => {
  return requestHandler(type, resource, params);
};

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  async componentDidMount() {
    buildHasuraProvider({ client: apolloClient }).then((dataProvider) =>
      this.setState({ dataProvider })
    );
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin
        dataProvider={dataProviderDecorator(dataProvider)}
        title="Admin Console"
        dashboard={Dashboard}
      >
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
        <Resource name="m2_bells" options={{ label: "Bells" }} {...bells} />
        <Resource name="m2_blocks" options={{ label: "Blocks" }} {...blocks} />
        <Resource name="m2_tasks" options={{ label: "Tasks" }} {...tasks} />
        <Resource name="m2_goals" options={{ label: "Goals" }} {...goals} />
        <Resource
          name="m2_bell_executors"
          options={{ label: "Bell Executors" }}
          {...bell_executors}
        />
        <Resource
          name="m2_bellhop_bell_participations"
          options={{ label: "Bellhop Bell Participations" }}
          {...bellhop_bell_participations}
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
