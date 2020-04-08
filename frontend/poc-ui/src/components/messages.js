import React, { useState, useEffect, useRef } from "react";
import { formatTime } from "../libs/custom-functions";
import logo from "../assets/bell-round.png";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @author tchen@bellhop.io
 * @function CaseMessages
 **/
const CaseMessages = ({ messages }) => {
  const [users, setUsers] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    apiWrapper.get("/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  useEffect(() => {
    // on messages, messages block scroll to the bottom.
    messagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function GetIcon(user) {
    try {
      if (typeof user === "string" && user.startsWith("agent")) {
        return logo;
      } else {
        let userInfo = users.filter((u) => u.username === user)[0].attributes;
        return userInfo.picture;
      }
    } catch (err) {
      return <FontAwesomeIcon icon="robot" />;
    }
  }

  return (
    <div
      className="mr-2"
      style={{ height: "calc(100vh - 130px)", overflow: "hidden" }}
    >
      {messages &&
        messages.map((msg, index) => {
          return (
            msg.data && (
              <div key={index} className="mb-2">
                <img
                  className="thumbnail rounded-circle pull-left"
                  src={GetIcon(msg.data.fromUser)}
                  alt=""
                />
                <span className="ml-1 text-gray">
                  {formatTime(msg.data.createdAt)}
                </span>
                <span className="ml-1">{msg.data.utterance}</span>
              </div>
            )
          );
        })}
      <div ref={messagesRef} />
    </div>
  );
};

export default CaseMessages;
