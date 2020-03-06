import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid';

function Cases (props) {
  const [ cases, setCases ] = useState([])

  function newCase () {
    // Only allow one new case for user for now.
    let currentCase = cases.find(c => c.state === 'new');
    if (currentCase !== undefined) return;

    // TODO: GET /case-definitations
    let resp = [{
      "id": uuidv4(),
      "name": "",
      "state": "pending",
      "planItems": []
    } ]

    let caseDef = resp[0]

    props.setCurrentCaseId(caseDef.id)
    setCases(cases => [caseDef, ...cases])
  }

  function getCaseList () {
    // TODO: GET /cases
    let resp = [
      {
        "id": uuidv4(),
        "name": "case 1",
        "state": "active",
        "planItems": []
      },
      {
        "id": uuidv4(),
        "name": "case 2",
        "state": "active",
        "planItems": []
      },
      {
        "id": uuidv4(),
        "name": "case 3",
        "state": "complete",
        "planItems": []
      }
    ]

    let cases = resp
    setCases( cases )
  }

  useEffect(getCaseList, [])

  const style = {
    case: {
      width: '11vw',
      height: '11vw',
      marginRight: '1vw',
      minWidth: '50px',
      minHeight: '50px',
      maxWidth: '100px',
      maxHeight: '100px',
      overflow: 'hidden',
      position: 'relative',
      border: '2px solid'
    }
  }

  return (
    <div className="row mt-1 text-center">
      <div
        className="d-flex justify-content-center border rounded-circle"
        style={style.case}
        data-toggle="tooltip"
        data-placement="right"
        onClick={newCase}
        title="create new case" >
        <FontAwesomeIcon icon="plus" className="align-self-center" />
      </div>

      {cases.map((c, index) => {
        let className = (c.id === props.currentCaseId) ? 'border-warning' : 'border-light';

        switch (c.state) {
          case "pending": className = `text-primary ${className}`; break;
          case "active": className = `text-success ${className}`; break;
          case "complete": className = `text-dark ${className}`; break;
          default: className = `text-secondar ${className}`;
        }

        className = `btn-light d-flex justify-content-center rounded-circle ${className}`;

        return (
          <div
            className={className}
            key={index}
            data-toggle="tooltip"
            data-placement="right"
            style={style.case}
            onClick={e => props.setCurrentCaseId(c.id)}
            title={c.name} >
            <div className="align-self-center">
              <FontAwesomeIcon icon="bell" /><br/>
            </div>
          </div>
        )
      } )}
    </div>
  );
};

export default Cases;