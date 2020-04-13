/**
 * for cards layout. 2 columns by default.
 * @designed by Substantial, Mar 2020.
 * @author tchen@bellhop.io
 */
import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import CreateCase from "./create-case";
import { formatDate } from "../libs/custom-functions";
import ProgressBar from "react-bootstrap/ProgressBar";

function CasesCards({ className, user }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    function listCases() {
      let path = `/cases`;
      apiWrapper
        .get(path)
        .then((resp) => {
          // console.debug( `Got cases: ${ JSON.stringify( resp.data, null, 2 ) }` );
          let _cases = resp.data.filter(
            (c) => c.data.owner && c.data.owner === user.username
          );
          setCases(_cases);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    listCases();
  }, [user]);

  return (
    <div className={className}>
      <h2 className="mt-5 col-12">Cases</h2>
      <hr className="border-gray col-12 m-0" />
      {cases.length > 0 &&
        cases.map((c, index) => {
          return (
            c.data && (
              <div className="col col-12 col-sm-6" key={index}>
                <div className="card mt-2 mb-2" style={{ minHeight: "150px" }}>
                  <div className="card-header">
                    <div className="d-flex justify-content-star">
                      {c.data.name}
                    </div>
                    <div className="d-flex justify-content-end">
                      {c.data.planItems &&
                        c.data.planItems.map((task) => {
                          return (
                            <img
                              key={task.id}
                              className="thumbnail rounded-circle"
                              src={task.owner.picture}
                              alt=""
                            />
                          );
                        })}
                    </div>
                    {/* <span className="ml-2"> { JSON.stringify( c.data ) }</span> */}
                  </div>
                  <div className="card-body text-gray pl-4 small">
                    <div>deadline {formatDate(c.data.createdAt)}</div>
                    <div>started {formatDate(c.data.createdAt)}</div>
                    <ProgressBar
                      className="mt-4"
                      variant="light-gray"
                      now={60}
                    />
                  </div>
                </div>
              </div>
            )
          );
        })}
      <div className="d-flex adjust-content-center m-auto">
        <CreateCase
          className="create-case mr-2 p-3 d-flex border rounded-circle border-dark text-dark bg-transparent"
          user={user}
          cases={cases}
          setCases={setCases}
        />
        <h2>New Cases</h2>
      </div>
    </div>
  );
}

export default CasesCards;
