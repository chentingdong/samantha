import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid';
import { textStateColorClassName } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper'

function Cases (props) {
  const [ cases, setCases ] = useState([])

  function newCase () {
    // Only allow one new case for user for now.
    let currentCase = cases.find(c => c.state === 'pending');
    if ( currentCase !== undefined ) return;

    let initCase = [ {
      "id": uuidv4(),
      "name": "",
      "state": "pending",
      "planItems": []
    } ]

    // TODO: GET /case-defination
    apiWrapper
      .get( '/case-definitions' )
      .then( ( resp ) => {
        resp = initCase;
        console.debug(`get case defination ${resp}`)
        let caseDef = resp[ 0 ]
        props.setCurrentCaseId( caseDef.id );
        setCases( cases => [ caseDef, ...cases ] )
      } )
      .catch( err => {
        console.error( err );
      } )
  }

  function getCaseList () {
    /*
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
    */

    apiWrapper
      .get( '/cases' )
      .then( ( resp ) => {
        console.debug(`Get cases: ${resp}`)
        let cases = resp;
        setCases( cases )
      } )
      .catch( (err) => {
        console.error(err)
      })

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
    <div className="row mt-1">
      <div
        className="btn btn-light d-flex justify-content-center border rounded-circle case"
        style={style.case}
        data-toggle="tooltip"
        data-placement="right"
        onClick={newCase}
        title="create new case" >
        <FontAwesomeIcon icon="plus" className="align-self-center"/>
      </div>

      {cases.map((c, index) => {
        let className = 'btn btn-light d-flex justify-content-center rounded-circle case ';
        className += ( c.id === props.currentCaseId ) ? 'border-warning ' : 'border-light ';
        className += textStateColorClassName(c.state)
        return (
          <div
            className={className}
            key={index}
            data-toggle="tooltip"
            data-placement="right"
            style={style.case}
            onClick={e => props.setCurrentCaseId(c.id)}
            title={c.name} >
            <FontAwesomeIcon icon="bell" className="align-self-center"/>
          </div>
        )
      } )}
    </div>
  );
};

export default Cases;