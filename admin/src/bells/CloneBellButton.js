import React, { useCallback } from "react";
import FileCopy from "@material-ui/icons/FileCopy";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-admin";
import apolloClient from "../ApolloClient";
import { gql } from "@apollo/client";

const styles = {
  button: {
    marginTop: "1em",
  },
};

const CloneBellButton = ({ classes, record }) => {
  const handleClick = useCallback(
    async (event) => {
      const { data, errors } = await apolloClient.mutate({
        mutation: gql`
          mutation clone_bell_by_pk(
            $id: String!
            $is_definition: Boolean = false
          ) {
            action: clone_m2_bells_by_pk(
              is_definition: $is_definition
              pk_columns: { id: $id }
            )
          }
        `,
        variables: { id: record.id },
      });

      if (errors) {
        console.error(errors);
      } else {
        alert("The current Bell has been cloned successfully");
      }
    },
    [record]
  );
  return (
    <Button
      className={classes.button}
      label="Clone a Bell"
      title="Clone a Bell"
      onClick={handleClick}
    >
      <FileCopy />
    </Button>
  );
};

export default withStyles(styles)(CloneBellButton);
