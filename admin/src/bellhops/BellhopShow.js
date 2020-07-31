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
  BooleanField,
  ImageField,
} from "react-admin";
import BellhopTitle from "./BellhopTitle";
import AddBellhopMembershipButton from "./AddBellhopMembershipButton";
import AddBellParticipationButton from "./AddBellParticipationButton";

const BellhopShow = (props) => (
  <Show title={<BellhopTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <ImageField source="profile_image_url" label="Profile Image" />
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
      <Tab label="Bells" path="bells">
        <ReferenceManyField
          addLabel={false}
          reference="m2_bellhop_bell_participations"
          target="bellhop_id"
        >
          <Datagrid>
            <ReferenceField
              label="Bell Name"
              source="bell_id"
              reference="m2_bells"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField
              label="Is Definition?"
              source="bell_id"
              reference="m2_bells"
              link={false}
            >
              <BooleanField source="is_definition" />
            </ReferenceField>
            <ReferenceField
              label="Acts as Main Bell"
              source="bell_id"
              reference="m2_bells"
              link={false}
            >
              <BooleanField source="acts_as_main_bell" />
            </ReferenceField>
            <TextField source="role" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddBellParticipationButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellhopShow;
