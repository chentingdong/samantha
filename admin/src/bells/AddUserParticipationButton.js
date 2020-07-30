import React from "react";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-admin";

const styles = {
  button: {
    marginTop: "1em",
  },
};

const AddUserParticipationButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    component={Link}
    to={`/m2_user_bell_participations/create?bell_id=${record.id}`}
    label="Invite a User"
    title="Invite a User"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddUserParticipationButton);
