import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid4 from 'uuid';
import { textStateColorClassName, currentUser } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper'

function Cases ( props ) {
  const [ cases, setCases ] = useState( [] );

  const initCase = {
    "id": uuid4(),
    "name": "case 1",
    "creator": "",
    "state": "pending",
    "planItems": []
  }

  async function newCase () {
    // Only allow one new case for user for now.
    let currentCase = cases.find(c => c.state === 'pending');
    if ( currentCase !== undefined ) return;
    let user = await currentUser()

    // GET /case-defination
    apiWrapper
      .get( '/case-definitions' )
      .then( ( resp ) => {
        console.debug( `get case defination ${ resp }` )
        let caseInstance = resp.data[ 0 ];
        caseInstance.id = initCase.id;
        caseInstance.creator = user;
        setCases( cases => [ caseInstance, ...cases ] )

        props.setCurrentCaseId( caseInstance.id );

        // save immediately, for 2020Q1.
        postNewCase( caseInstance)
      } )
      .catch( err => {
        console.error( err );
      } )

  }

  function postNewCase ( caseInstance ) {
    apiWrapper
      .post( '/cases', caseInstance )
      .then( resp => {
        if ( resp.status === 200 ) {
          console.log(`Created case ${resp}`)
        }
      } )
      .catch( err => {
        console.error(err)
      })
  }

  function getCases () {
    apiWrapper
      .get( '/cases' )
      .then( ( resp ) => {
        console.debug(`Get cases: ${resp}`)
        let cases = resp.data;
        setCases( cases )
      } )
      .catch( (err) => {
        console.error(err)
      })
  }

  useEffect(getCases, [])

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
            <FontAwesomeIcon icon="bell" className="align-self-center" />
          </div>
        )
      })}
    </div>
  );
};

export default Cases;