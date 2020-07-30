import React from "react";
import {
  Datagrid,
  List,
  TextField,
  SingleFieldList,
  ChipField,
  ShowButton,
  ReferenceManyField,
  ReferenceField,
} from "react-admin";

const BellhopList = (props) => (
  <List {...props} perPage={25} sort={{ field: "name", order: "ASC" }}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <ReferenceManyField
        reference="m2_bellhop_memberships"
        target="bellhop_id"
        label="Users"
      >
        <SingleFieldList linkType={false}>
          <ReferenceField source="user_id" reference="m2_users" link={false}>
            <ChipField source="name" />
          </ReferenceField>
        </SingleFieldList>
      </ReferenceManyField>
      <ShowButton />
    </Datagrid>
  </List>
);

export default BellhopList;
