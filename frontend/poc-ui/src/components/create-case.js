/**
* @author
* @function CreateCase
**/
import React, { useState, useEffect } from 'react';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

const CreateCase = ( { cases, setCases, setCurrentCaseId } ) => {
  const user = Auth.user;
  const [ caseDefinitions, setCaseDefinitions ] = useState( [] );
  const [ newCase, setNewCase ] = useState( [] );

  useEffect( () => {
    function getCaseDefinitions () {
      let path = '/case-definitions';
      apiWrapper
        .get( path )
        .then( resp => {
          setCaseDefinitions( resp.data );
        } )
        .catch( err => {
          console.error( err );
        } );
    }

    getCaseDefinitions();
  }, [] );


  function createCase () {
    apiWrapper
      .get( '/case-definitions' )
      .then( ( resp ) => {
        console.debug( `get case defination ${ JSON.stringify( resp ) }` );
        setCaseDefinitions( resp.data );

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

  function postNewCase () {
    apiWrapper
      .post( '/cases', newCase )
      .then( resp => {
        if ( resp.status === 200 ) {
          const newCase = resp.data;
          setCases( cases => {
            return [ newCase, ...cases ];
          } );

          setCurrentCaseId( resp.data.id );
        }
      } )
      .catch( err => {
        console.error( err );
      } );
  }


  return (
    <div className="create">
      <Dropdown>
        <Dropdown.Toggle className="p-3 d-flex border rounded-circle border-success text-success bg-transparent">
          <FontAwesomeIcon icon="plus" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            caseDefinitions.length > 0 &&
            caseDefinitions.map( caseDefinition => {
              return (
                <Dropdown.Item eventKey="1"
                  onClick={ e => createCase( caseDefinition ) }
                  key={ caseDefinition.id }>
                  <FontAwesomeIcon icon={ caseDefinition.data.faIcon } />
                  <span> { caseDefinition.data.name }</span>
                </Dropdown.Item>
              );
            } )
          }
        </Dropdown.Menu>
      </Dropdown>
    </div> );

};

export default CreateCase;