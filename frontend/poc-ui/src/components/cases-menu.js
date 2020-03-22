import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';

function CasesMenu ( { currentCaseId, setCurrentCaseId } ) {
  const [ cases, setCases ] = useState( [] );
  const user = Auth.user;

  function newCase () {
    apiWrapper
      .get( '/case-definitions' )
      .then( ( resp ) => {
        console.debug( `get case defination ${ JSON.stringify( resp ) }` );
        //TODO: Only one case def for now, will do select UX.
        let caseInstance = resp.data[ 0 ].data;
        caseInstance.creator = user.id;
        setCurrentCaseId( caseInstance.id );

        // save immediately, for 2020Q1.
        postNewCase( caseInstance );

        // add new case to cases in UI
        setCases( cases => [ caseInstance, ...cases ] );
      } )
      .catch( err => {
        console.error( err );
      } );
  }

  function postNewCase ( caseInstance ) {
    apiWrapper
      .post( '/cases', caseInstance )
      .then( resp => {
        if ( resp.status === 200 ) {
          const caseInstance = resp.data;
          setCases( cases => {
            return [ caseInstance, ...cases ];
          } );

          setCurrentCaseId( resp.data.id );
        }
      } )
      .catch( err => {
        console.error( err );
      } );
  }

  function getCases () {
    let path = `/cases`;
    apiWrapper
      .get( path )
      .then( ( resp ) => {
        console.debug( `Got cases: ${ JSON.stringify( resp.data, null, 2 ) }` );
        let _cases = resp.data.filter( ( c ) => c.data.creator && c.data.creator === user.id );
        setCases( _cases );
        if ( _cases.length > 0 )
          setCurrentCaseId( _cases[ 0 ].id );
      } )
      .catch( ( err ) => {
        console.error( err );
      } );
  }

  useEffect( () => {
    getCases();
  }, [] );

  return (
    <nav className="case text-light bg-dark">
      <h2 className="mt-4">Cases</h2>
      { cases.length > 0 &&
        cases.map( ( c, index ) => {
          return (
            c.data &&
            <div key={ index }
              className="nav-item nav-link btn-dark"
              onClick={ e => setCurrentCaseId( c.id ) } >
              <div>
                <FontAwesomeIcon icon="folder" className="" />
                <span className="ml-2"> { c.data.name }</span>
              </div>
              <div>
                { c.data.description }
              </div>
            </div>
          );
        } )
      }
      <div className="create">
        <div className="p-3 d-flex border rounded-circle border-success text-success"
          onClick={ newCase }>
          <FontAwesomeIcon icon="plus" />
        </div>
      </div>
    </nav>
  );
};

export default CasesMenu;