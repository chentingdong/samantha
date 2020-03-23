/**
 * @author tchen@bellhop.io
 * @function CaseMessages
 **/
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTime } from '../libs/custom-functions';
import logo from '../assets/bell.png';

const CaseMessages = ( { className, messages } ) => {
  function GetIcon ( user ) {
    if ( user.name === 'agent' ) {
      return <img className="thumbnail small"
        src={ logo }
        alt='<Fontawesome icon="robot" />' />;
    } else {
      return <img className="thumbnail rounded-circle"
        src={ user.picture }
        alt="<Fontawesome icon='user'/>" />;
    }
  }
  return (
    <div className={ className }>
      { messages &&
        messages.map( ( msg, index ) => {
          return (
            msg.data &&
            <div key={ index } className="mb-1 p-1 pl-2">
              <span className="">
                { GetIcon( msg.data.fromUser ) }
                <span className="ml-1 text-gray d-inline">
                  { formatTime( msg.data.createdAt ) }
                </span>
              </span>
              <span className="col-12">{ msg.data.utterance }</span>
            </div>
          );
        } ) }
    </div>
  );
};

export default CaseMessages;