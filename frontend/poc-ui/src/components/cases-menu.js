import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';
import CreateCase from './create-case';

function CasesMenu ( { currentCaseId, setCurrentCaseId } ) {
  const [ cases, setCases ] = useState( [] );
  const user = Auth.user;

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
    <div className="case-menu row text-light bg-dark">
      <h2 className="mt-5 ml-2">Cases</h2>
      <hr className="border-light col-12 m-0" />
      { cases.length > 0 &&
        cases.map( ( c, index ) => {
          const active = ( c.id === currentCaseId ) ? 'active' : '';
          return (
            c.data &&
            <div key={ index }
              className={ `menu-item col-12 bg-darker p-2 ${ active }` }
              onClick={ e => setCurrentCaseId( c.id ) } >
              <div>
                <FontAwesomeIcon icon={ c.data.icon } className="" />
                <span className="ml-2"> { c.data.name }</span>
              </div>
              <div>
                { c.data.description }
              </div>
            </div>
          );
        } )
      }
      <CreateCase cases={ cases } setCases={ setCases } setCurrentCaseId={ setCurrentCaseId } />
    </div >
  );
};

export default CasesMenu;