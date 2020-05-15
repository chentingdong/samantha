import React from "react";

export const RequestsReceivedItem = ({ block }) => {
  return (
    <div className="card mt-2 pt-2">
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h4>{block.name}</h4>
          <p>{block.description}</p>
          <p>Owner: {block.requestors[0]?.name</p>
          <p>
            {block.children?.map((block, index2) => {
                return (
                  <span className="border p-2 mr-2" key={`block-${index2}`}>
                    {block.name} ({block.state})
                  </span>
                )
              })}
          </p>
        </div>
      </div>    
    </div>
  );
};
