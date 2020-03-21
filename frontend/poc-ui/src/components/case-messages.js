/**
 * @author tchen@bellhop.io
 * @function CaseMessages
 **/
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTime } from '../libs/custom-functions';
import logo from '../assets/bell.png';

const CaseMessages = ( { messages } ) => {
  return (
    <div>
      { messages &&
        messages.map( ( msg, index ) => {
          return (
            msg.data &&
            <div key={ index } className="row mb-1 p-1 pl-2">
              <div className="col-12">
                {
                  ( () => {
                    if ( msg.data.fromUser.name === 'agent' ) {
                      return <img className="thumbnail" src={ logo } alt='<Fontawesome icon="robot" />' />;
                    }
                    else {
                      return <img src={ msg.data.fromUser.picture }
                        className="thumbnail"
                        alt="<Fontawesome icon='user'/>" />;
                    }
                  } )()
                }
                <span className="ml-1 text-secondary">
                  { formatTime( msg.data.createdAt ) }
                </span>
              </div>
              <div className="col-12">{ msg.data.utterance }</div>
            </div>
          );
        } ) }
    </div>
  );
};

export default CaseMessages;