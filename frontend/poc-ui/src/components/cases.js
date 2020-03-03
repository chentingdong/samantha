import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-multi-carousel/lib/styles.css'

function Cases (props) {
  const [ cases, setCases ] = useState([])

  function updateCaseList () {
    // TODO: ws case list endpoint
    let existingCases = [
      { 'id': 'case_1', 'name': 'case 1', 'status': 'active' },
      { 'id': 'case_2', 'name': 'case 2', 'status': 'idle' },
      { 'id': 'case_3', 'name': 'case 3, blah blah...', 'status': 'closed' },
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
      overflow: 'hidden',
      position: 'relative'
    },
    center: {
      margin: '0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  return (
    <div className="row mt-1">
      <div className=" btn btn-light" style={style.square}>
        <FontAwesomeIcon icon="plus" className="center" />
      </div>
      {cases.map((c, index) => {
        let cn = ''
        switch (c.status) {
          case "active": cn = 'text-primary'; break;
          case "idle": cn = 'text-warning'; break;
          case "closed": cn = 'text-secondary'; break;
          default: cn = 'text-secondar';
        }
        cn = ` btn btn-light ${cn}`;

        return (
          <div className={cn} key={index} style={style.square}>
            <div className="center small">
              <FontAwesomeIcon icon="bell" />
              <div>{c.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Cases;