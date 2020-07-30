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

const AddBlockParticipationButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    component={Link}
    to={`/m2_user_block_participations/create?user_id=${record.id}`}
    label="Join a Block"
    title="Join a Block"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddBlockParticipationButton);
