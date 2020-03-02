import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

function Activities (props) {
  const [ Activity, setActivity ] = useState([])

  function updateCaseList () {
    // TODO: ws case list endpoint
    let activities = [
      { 'id': 'case_1', 'name': 'case 1', 'status': 'active' },
      { 'id': 'case_2', 'name': 'case 2', 'status': 'idle' },
      { 'id': 'case_3', 'name': 'case 3', 'status': 'closed' },
      { 'id': 'case_4', 'name': 'case 4', 'status': 'closed' }
    ]

    setActivity(activities)
  }

  useEffect(updateCaseList, [])

  return (
    <div className={props.className}>
        {Activity.map((activities, index) => {
          let cn = ''
          switch (activities.status) {
            case "active": cn = 'text-success'; break;
            case "idle": cn = 'text-primary'; break;
            case "closed": cn = 'text-secondary'; break;
          }
          cn = `btn btn-sq-lg btn-light mr-1 ${cn}`;

          return (
            <button className={cn} key={index}>
              <FontAwesomeIcon icon="bell" />
              <div>{activities.name}</div>
            </button>
          )
        })}
    </div>
  );
};

export default Activities;