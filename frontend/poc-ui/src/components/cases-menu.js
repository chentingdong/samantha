import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiWrapper from '../libs/api-wrapper';
import CreateCase from './create-case';
import { formatDate } from '../libs/custom-functions';

function CasesMenu ( { user, className, currentCaseId, setCurrentCaseId } ) {
  const [ cases, setCases ] = useState( [] );

  useEffect( () => {
    function getCases () {
      let path = `/cases`;
      apiWrapper
        .get( path )
        .then( ( resp ) => {
          // console.debug( `Got cases: ${ JSON.stringify( resp.data, null, 2 ) }` );
          let _cases = resp.data.filter( ( c ) => {
            let isOwnerCase = c.data.owner && c.data.owner === user.username;
            let isParticipantCase = c.data.participants && c.data.participants.indexOf( user.username ) > 0;
            return isOwnerCase || isParticipantCase;
          } );
          setCases( _cases );
          if ( _cases.length > 0 )
            setCurrentCaseId( _cases[ 0 ].id );
        } )
        .catch( ( err ) => {
          console.error( err );
        } );
    }

    getCases();
  }, [] );

  return (
    <div className={ className }>
      <h2 className="mt-5 ml-2">Cases</h2>
      <hr className="border-gray col-12 m-0" />
      { cases.length > 0 &&
        cases.map( ( c, index ) => {
          const active = ( c.id === currentCaseId ) ? 'active' : '';
          return (
            c.data &&
            <div key={ index }
              className={ `menu-item col-12 bg-darker p-2 clickable ${ active }` }
              onClick={ e => setCurrentCaseId( c.id ) } >
              <div>
                <FontAwesomeIcon icon={ c.data.icon } className="" />
                <span className="ml-2"> { c.data.name }</span>
              </div>
              <div className="text-gray pl-4 small">
                started { formatDate( c.data.createdAt ) }
              </div>
            </div>
          );
        } )
      }
      <div className="d-flex position-absolute"
        style={ { bottom: '50px', left: 'calc(50% - 1.5em)' } }
      >
        <CreateCase className="create-case d-flex p-3 border border-success text-success rounded-circle bg-dark"
          user={ user }
          cases={ cases }
          setCases={ setCases }
          setCurrentCaseId={ setCurrentCaseId }
        />
      </div>
    </div >
  );
};

export default CasesMenu;