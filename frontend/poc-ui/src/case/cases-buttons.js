/**
 * used for mobile first layout. Jan, 2020.
 * @author tchen@bellhop.io
 */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stateColor } from "../libs/custom-functions";
import apiWrapper from "../libs/api-wrapper";

function Cases({ user, currentCaseId, setCurrentCaseId }) {
  const [cases, setCases] = useState([]);
  function newCase() {
    apiWrapper
      .get("/case-definitions")
      .then((resp) => {
        console.debug(`get case defination ${JSON.stringify(resp)}`);
        //TODO: Only one case def for now, will do select UX.
        let caseInstance = resp.data[0].data;
        caseInstance.creator = user.id;
        setCurrentCaseId(caseInstance.id);

        // save immediately, for 2020Q1.
        postNewCase(caseInstance);

        // add new case to cases in UI
        setCases((cases) => [caseInstance, ...cases]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function postNewCase(caseInstance) {
    apiWrapper
      .post("/cases", caseInstance)
      .then((resp) => {
        if (resp.status === 200) {
          const caseInstance = resp.data;
          setCases([caseInstance, ...cases]);
          setCurrentCaseId(resp.data.id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function listCases() {
    let path = `/cases`;
    apiWrapper
      .get(path)
      .then((resp) => {
        // console.debug( `Got cases: ${ JSON.stringify(resp.data, null, 2) }` );
        let _cases = resp.data.filter(
          (c) => c.data.creator && c.data.creator === user.id
        );
        setCases(_cases);
        if (_cases.length > 0) setCurrentCaseId(_cases[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    listCases();
  }, []);

  const style = {
    case: {
      width: "11vw",
      height: "11vw",
      marginRight: "1vw",
      minWidth: "50px",
      minHeight: "50px",
      maxWidth: "100px",
      maxHeight: "100px",
      overflow: "hidden",
      position: "relative",
      border: "2px solid",
    },
  };

  return (
    <div>
      <div
        className="btn btn-light d-flex justify-content-center border rounded-circle case"
        style={style.case}
        data-toggle="tooltip"
        data-placement="right"
        onClick={newCase}
        title="create new case"
      >
        <FontAwesomeIcon icon="plus" className="align-self-center" />
      </div>
      {cases.length > 0 &&
        cases.map((c, index) => {
          let className =
            "btn btn-light d-flex justify-content-center rounded-circle case ";
          className +=
            c.id === currentCaseId ? "border-warning " : "border-light ";
          className += "text-" + stateColor(c.state);
          return (
            <div
              className={className}
              key={index}
              data-toggle="tooltip"
              data-placement="right"
              style={style.case}
              onClick={(e) => setCurrentCaseId(c.id)}
              title={c.name}
            >
              <FontAwesomeIcon icon="bell" className="align-self-center" />
            </div>
          );
        })}
    </div>
  );
}

export default Cases;
