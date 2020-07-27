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

const AddBellhopParticipationButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    component={Link}
    to={`/m2_bellhop_bell_participations/create?bell_id=${record.id}`}
    label="Involve a Bellhop"
    title="Involve a Bellhop"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddBellhopParticipationButton);
