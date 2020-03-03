import React, { useState, useEffect } from 'react';
import {Tooltip} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-multi-carousel/lib/styles.css'

function Cases (props) {
  const [ cases, setCases ] = useState([])

  function updateCaseList () {
    // TODO: ws case list endpoint
    let existingCases = [
      { 'id': 'case_1', 'name': 'case 1', 'status': 'active' },
      { 'id': 'case_2', 'name': 'case 2', 'status': 'idle' },
      { 'id': 'case_3', 'name': 'case 3, blah blah...blah blah blahlah', 'status': 'closed' },
      { 'id': 'case_4', 'name': 'case 4', 'status': 'closed' }
    ]

    setCases(existingCases)
  }

  useEffect(updateCaseList, [])

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
      <button
        className="btn btn-light d-flex justify-content-center"
        style={style.square}
        data-toggle="tooltip"
        data-placement="right"
        title="create new case" >
        <FontAwesomeIcon icon="plus" className="align-self-center" />
      </button>
      {cases.map((c, index) => {
        let cn = ''
        switch (c.status) {
          case "active": cn = 'text-primary'; break;
          case "idle": cn = 'text-warning'; break;
          case "closed": cn = 'text-secondary'; break;
          default: cn = 'text-secondar';
        }
        cn = ` btn btn-light d-flex justify-content-center ${cn}`;

        return (
          <button
            className={cn}
            key={index}
            data-toggle="tooltip"
            data-placement="right"
            style={style.square}
            title={c.name} >
            <div className="align-self-center">
              <FontAwesomeIcon icon="bell" /><br/>
            </div>
          </button>
        )
      })}
    </div>
  );
};

export default Cases;