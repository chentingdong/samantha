import React from "react";
import {
  Datagrid,
  TextField,
  Tab,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ShowButton,
  ReferenceField,
} from "react-admin";
import BellhopTitle from "./BellhopTitle";
import AddBellhopMembershipButton from "./AddBellhopMembershipButton";

const BellhopShow = (props) => (
  <Show title={<BellhopTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
      </Tab>
      <Tab label="Members" path="users">
        <ReferenceManyField
          addLabel={false}
          reference="m2_bellhop_memberships"
          target="bellhop_id"
        >
          <Datagrid>
            <ReferenceField
              label="Users"
              source="user_id"
              reference="m2_users"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <TextField source="role" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddBellhopMembershipButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellhopShow;
