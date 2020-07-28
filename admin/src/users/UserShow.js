import React from "react";
import {
  Datagrid,
  TextField,
  ImageField,
  Tab,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ShowButton,
  ReferenceField,
  UrlField,
} from "react-admin";
import UserTitle from "./UserTitle";
import AddBellhopMembershipButton from "./AddBellhopMembershipButton";

const UserShow = (props) => (
  <Show title={<UserTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <TextField source="family_name" />
        <TextField source="given_name" />
        <UrlField source="picture" />
        <ImageField source="picture" label="" />
      </Tab>
      <Tab label="Bellhops" path="bellhops">
        <ReferenceManyField
          addLabel={false}
          reference="m2_bellhop_memberships"
          target="user_id"
        >
          <Datagrid>
            <ReferenceField
              label="Bellhop"
              source="bellhop_id"
              reference="m2_bellhops"
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

export default UserShow;
