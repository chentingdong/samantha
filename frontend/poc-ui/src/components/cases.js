import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-multi-carousel/lib/styles.css'
import { v4 as uuidv4 } from 'uuid';

function Cases (props) {
  const [ cases, setCases ] = useState([])
  const [ currentCaseId, setCurrentCaseId] = useState()

  function newCase () {
    // Only allow one new case for user for now.
    let currentCase = cases.find(c => c.state === 'new');
    if (currentCase !== undefined) return;

    // TODO: get case def from case api
    let caseDef = {
      "id": uuidv4(),
      "name": "",
      "state": "new",
      "planItems": []
    }
    setCurrentCaseId(caseDef.id)
    setCases(cases => [caseDef, ...cases])
  }

  function getCaseList () {
    // TODO: ws case list endpoint
    let data = [
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
        "state": "closed",
        "planItems": []
      }
    ]

    // let existingCases = JSON.parse(data)
    setCases(data)
  }

  useEffect(getCaseList, [])

  const style = {
    square: {
      width: '11vw',
      height: '11vw',
      marginRight: '1vw',
      minWidth: '50px',
      minHeight: '50px',
      maxWidth: '100px',
      maxHeight: '100px',
      overflow: 'hidden',
      position: 'relative'
    }
  }
  return (
    <div className="row mt-1 text-center">
      <div
        className="d-flex justify-content-center border rounded-circle"
        style={style.square}
        data-toggle="tooltip"
        data-placement="right"
        onClick={newCase}
        title="create new case" >
        <FontAwesomeIcon icon="plus" className="align-self-center" />
      </div>
      {cases.map((c, index) => {
        let className = (c.id === currentCaseId) ? 'btn-secondary' : 'btn-light';

        switch (c.state) {
          case "new": className = `text-primary ${className}`; break;
          case "active": className = `text-success ${className}`; break;
          case "closed": className = `text-secondary ${className}`; break;
          default: className = `text-secondar ${className}`;
        }

        className = `d-flex justify-content-center rounded-circle ${className}`;

        return (
          <div
            className={className}
            key={index}
            data-toggle="tooltip"
            data-placement="right"
            style={style.square}
            onClick={e => setCurrentCaseId(c.id)}
            title={c.name} >
            <div className="align-self-center">
              <FontAwesomeIcon icon="bell" /><br/>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Cases;