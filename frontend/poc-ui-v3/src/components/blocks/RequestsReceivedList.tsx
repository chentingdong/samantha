import React, { useContext } from "react";
import { RequestsReceivedItem } from "../block/RequestsReceivedItem";
import { useQuery } from "@apollo/client";
import { Context } from "../context/store";
import { REQUESTS_RECEIVED } from "../../operations/queries/requestsReceived";

export const RequestsReceivedList = () => {
  const { state, dispatch } = useContext(Context);

  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: state.user.id },
  });

  if (loading) return <>Loading...</>;
  if (error) return <>{`Error! ${error.message}`}</>;

  return (
    <div>
      {data.blocks &&
        data.blocks.map((block) => (
          <RequestsReceivedItem key={block.id} block={block} />
        ))}
    </div>
  );
};
