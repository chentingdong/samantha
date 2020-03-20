/**
 * @author tchen@bellhop.io
 * @function CaseMessages
 **/
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTime } from '../libs/custom-functions';

const CaseMessages = ( { messages } ) => {
  const style = {
    inlineImage: {
      height: "1.5em"
    }
  };

  return (
    <div className="messages mt-1">
      { messages &&
        messages.map( ( msg, index ) => {
          return (
            msg.data &&
            <div key={ index } className="card bg-light shadow-none row small mb-1 p-1 pl-2">
              <div className="mr-1">
                {/* {
                  ( () => {
                    if ( msg.data.fromUser.name === 'agent' ) {
                      return <FontAwesomeIcon icon="robot" />;
                    }
                    else {
                      return <img src={ msg.data.fromUser.picture }
                        style={ style.inlineImage }
                        alt="<Fontawesome icon='user'"/>;
                    }
                  } )() } */}
                <span className="ml-1 text-secondary">
                  {/* { formatTime( msg.data.createdAt ) }: */}
                  </span><br />
              </div>
              <pre>{ JSON.stringify(msg, null, 2) }</pre>
            </div>
          );
        } ) }
    </div>
  );
};

export default CaseMessages;