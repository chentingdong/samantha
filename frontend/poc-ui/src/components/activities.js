import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-multi-carousel/lib/styles.css'

function Activities (props) {
  const [ Activity, setActivity ] = useState([])

  function updateCaseList () {
    // TODO: ws case list endpoint
    let activities = [
      { 'id': 'case_1', 'name': 'case 1', 'status': 'active' },
      { 'id': 'case_2', 'name': 'case 2', 'status': 'idle' },
      { 'id': 'case_3', 'name': 'case 3, blah blah...', 'status': 'closed' },
      { 'id': 'case_4', 'name': 'case 4', 'status': 'closed' }
    ]

    setActivity(activities)
  }

  useEffect(updateCaseList, [])

  const style = {
    square: {
      width: '18vw',
      height: '18vw',
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
      {Activity.map((activities, index) => {
        let cn = ''
        switch (activities.status) {
          case "active": cn = 'text-success'; break;
          case "idle": cn = 'text-warning'; break;
          case "closed": cn = 'text-secondary'; break;
        }
        cn = ` btn btn-light ${cn}`;

        return (
          <div className={cn} key={index} style={style.square}>
            <div className="center">
              <FontAwesomeIcon icon="bell" />
              <div>{activities.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Activities;