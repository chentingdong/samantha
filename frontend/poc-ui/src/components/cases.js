import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stateColor, currentUser } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper'

function Cases ( props ) {
  const [ cases, setCases ] = useState( [] );

  const initCase = {
    // "id": uuid4(),
    "name": "case 1",
    "creator": props.user,
    "state": "pending",
    "planItems": []
  }

  async function newCase () {
    // Only allow one new case for user for now.
    let currentCase = cases.find(c => c.state === 'pending');
    if ( currentCase !== undefined ) return;

    // TODO: shouldn't need this, check!
    let user = await currentUser()

    // GET /case-defination
    apiWrapper
      .get( '/case-definitions' )
      .then( ( resp ) => {
        console.debug( `get case defination ${ resp }` )
        let caseInstance = initCase
        caseInstance.creator = user
        props.setCurrentCaseId( caseInstance.id );

        // save immediately, for 2020Q1.
        postNewCase( caseInstance)

        // add new case to cases in UI
        setCases( cases => [ caseInstance, ...cases ] )
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
        props.setCurrentCaseId(resp.data.id)
      }
    } )
    .catch( err => {
      console.error(err)
    })
  }

  async function getCases () {
    let user = await currentUser()
    let path = `/cases`
    apiWrapper
      .get( path )
      .then( ( resp ) => {
        console.debug( `Get cases: ${ resp }` );
        let _cases = resp.data.filter( ( c ) => c.data.creator && c.data.creator.id === user.id)
        setCases( _cases );
        if ( _cases.length > 0 )
          props.setCurrentCaseId( _cases[ 0 ].id );
      } )
      .catch( (err) => {
        console.error(err)
      })
  }

  useEffect( () => {
    getCases();
  }, [])

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
      {cases.length > 0 &&
        cases.map( ( c, index ) => {
        let className = 'btn btn-light d-flex justify-content-center rounded-circle case ';
        className += ( c.id === props.currentCaseId ) ? 'border-warning ' : 'border-light ';
        className += stateColor(c.state)
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