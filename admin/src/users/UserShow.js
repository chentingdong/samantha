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
  BooleanField,
} from "react-admin";
import UserTitle from "./UserTitle";
import AddBellhopMembershipButton from "./AddBellhopMembershipButton";
import AddBellParticipationButton from "./AddBellParticipationButton";
import AddBlockParticipationButton from "./AddBlockParticipationButton";

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
      <Tab label="Bells" path="bells">
        <ReferenceManyField
          addLabel={false}
          reference="m2_user_bell_participations"
          target="user_id"
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
      <Tab label="Block" path="blocks">
        <ReferenceManyField
          addLabel={false}
          reference="m2_user_block_participations"
          target="user_id"
        >
          <Datagrid>
            <ReferenceField
              label="Block Name"
              source="block_id"
              reference="m2_blocks"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField
              label="Is Definition?"
              source="block_id"
              reference="m2_blocks"
              link={false}
            >
              <BooleanField source="is_definition" />
            </ReferenceField>
            <ReferenceField
              label="Block Type"
              source="block_id"
              reference="m2_blocks"
              link={false}
            >
              <TextField source="type" />
            </ReferenceField>
            <TextField source="role" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddBlockParticipationButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default UserShow;
