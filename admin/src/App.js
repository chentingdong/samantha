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
import user_bell_participations from "./user_bell_participations";
import user_block_participations from "./user_block_participations";
import Dashboard from "./Dashboard";
import apolloClient from "./ApolloClient";

const knownResources = [
  "m2_block_type",
  "m2_block_state",
  "m2_membership_roles",
  "m2_participation_roles",
  "clone_m2_bells_by_pk",
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
        <Resource
          name="m2_user_bell_participations"
          options={{ label: "User Bell Participations" }}
          {...user_bell_participations}
        />
        <Resource
          name="m2_user_block_participations"
          options={{ label: "User Block Participations" }}
          {...user_block_participations}
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
