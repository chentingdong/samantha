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

const AddBellParticipationButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    component={Link}
    to={`/m2_bellhop_bell_participations/create?bellhop_id=${record.id}`}
    label="Join a Bell"
    title="Join a Bell"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddBellParticipationButton);
