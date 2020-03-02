import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'

function ActiveCases (props) {
  const [ activeCases, setActiveCases ] = useState([])

  function updateCaseList () {
    // TODO: ws case list endpoint
    let cases = [
      { 'name': 'case 1', 'id': 'case_1' },
      { 'name': 'case 2', 'id': 'case_2' },
      { 'name': 'case 3', 'id': 'case_3' },
      { 'name': 'case 4', 'id': 'case_4' }
    ]

    setActiveCases(cases)
  }

  useEffect(updateCaseList, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div>
      <div>Active Cases</div>
      <Carousel className="row" responsive={responsive}>
        {activeCases.map((activeCase, index) => {
          return (
            <Card className="m-2 p-1 clickable" key={index}>
              <FontAwesomeIcon icon={faBell} />
              <div>{activeCase.name}</div>
            </Card>
          )
        })}
      </Carousel>
    </div>
  );
};

export default ActiveCases;