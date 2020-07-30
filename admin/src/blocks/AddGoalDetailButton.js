import React from "react";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-admin";
import { useQuery, Loading, Error } from "react-admin";

const styles = {
  button: {
    marginTop: "1em",
  },
};

const AddGoalDetailButton = ({ classes, record }) => {
  const { data, loading, error } = useQuery({
    type: "getOne",
    resource: "m2_goals",
    payload: { id: record.id },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data || data.id) return null;

  return (
    <Button
      className={classes.button}
      component={Link}
      to={`/m2_goals/create?block_id=${record.id}`}
      label="Add Goal Detail"
      title="Add Goal Detail"
    >
      <Add />
    </Button>
  );
};

export default withStyles(styles)(AddGoalDetailButton);
