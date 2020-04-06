import React, { useState, useEffect } from "react";
import { formatTime } from "../libs/custom-functions";
import logo from "../assets/bell-round.png";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @author tchen@bellhop.io
 * @function CaseMessages
 **/
const CaseMessages = ({ className, messages }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiWrapper.get("/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  function GetIcon(user) {
    console.log(JSON.stringify(user));
    try {
      if (typeof user === "string" && user.startsWith("agent")) {
        return (
          <img
            className="thumbnail"
            src={logo}
            alt='<Fontawesome icon="robot" />'
          />
        );
      } else {
        let userInfo = users.filter((u) => u.username === user)[0].attributes;
        return (
          <img
            className="thumbnail rounded-circle"
            src={userInfo.picture}
            alt='<Fontawesome icon="robot" />'
          />
        );
      }
    } catch (err) {
      return <FontAwesomeIcon icon="robot" />;
    }
  }

  return (
    <div className={className} style={{ height: "calc(100vh - 125px)" }}>
      {messages &&
        messages.map((msg, index) => {
          return (
            msg.data && (
              <div key={index} className="mb-1 p-1 pl-2">
                <span className="">
                  {GetIcon(msg.data.fromUser)}
                  <span className="ml-1 text-gray d-inline">
                    {formatTime(msg.data.createdAt)}
                  </span>
                </span>
                <span className="col-12">{msg.data.utterance}</span>
              </div>
            )
          );
        })}
    </div>
  );
};

export default CaseMessages;
