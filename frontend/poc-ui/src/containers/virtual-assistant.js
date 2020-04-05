import React, { useState, useEffect, useRef, useMemo } from "react";
import config from "../config";
import { DebounceInput } from "react-debounce-input";
import CasesMenu from "../case/cases-menu";
import Tasks from "../task/tasks";
import CaseMessages from "../components/messages";
import Suggest from "../components/suggest";
import apiWrapper from "../libs/api-wrapper";
import useWebSocket from "react-use-websocket";
import "../assets/virtual-assistant.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VirtualAssistant({ user }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedSuggestion, setselectedSuggestion] = useState(0);
  const suggestRef = useRef();

  const [currentCaseId, setCurrentCaseId] = useState();
  const wsOptions = useMemo(
    () => ({
      queryParams: {
        user: user.username,
      },
    }),
    []
  );

  // initiate a websocket connection, register connectionId.
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(
    config.wsUrl,
    wsOptions
  );

  const agentUser = {
    name: "agent",
    picture: '<Fontawesome icon="robot" />',
  };

  useEffect(() => {
    if (lastMessage !== null) {
      agentMessage(lastMessage.data);
    }
  }, [lastMessage]);

  function buildMessage(utterance, who) {
    return {
      caseId: currentCaseId,
      data: {
        fromUser: who,
        toUser: agentUser,
        utterance: utterance,
        createdAt: Date.now(),
      },
    };
  }

  function userMessage(utterance) {
    setCurrentMessage(utterance);
    let newMessage = buildMessage(utterance, user);
    apiWrapper
      .post("/case-messages", newMessage)
      .then((resp) => {
        newMessage.id = resp.data.id;
        setMessages([...messages, newMessage]);
        console.debug(
          `user message post success, resp from backend: ${JSON.stringify(
            resp
          )}`
        );
      })
      .catch((err) => {
        console.error(`user message post failed, ${err}`);
      });

    setCurrentMessage("");
  }

  function agentMessage(utterance) {
    console.log("agent message: " + JSON.stringify(utterance));
    let newMessage = buildMessage(utterance, agentUser);
    setMessages([...messages, newMessage]);
  }

  useEffect(() => {
    function getCaseMessages() {
      let path = `/case-messages`;
      let params = {
        caseId: currentCaseId,
      };
      apiWrapper
        .get(path, { params: params })
        .then((resp) => {
          if (!resp.data) resp.data = [];

          //TODO: dynamodb doesn't easily sort, do sorting in UI for now, until move to rds
          let msgs = resp.data.sort((a, b) =>
            a.data.createdAt > b.data.createdAt ? 1 : -1
          );

          setMessages(msgs);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getCaseMessages();
  }, [currentCaseId]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-3 col-lg-2 vh-100 bg-dark">
          <CasesMenu
            className="text-light bg-dark case-menu row"
            user={user}
            currentCaseId={currentCaseId}
            setCurrentCaseId={setCurrentCaseId}
          />
        </div>
        <div className="col col-md-6 col-lg-7 vh-100 bg-lighter">
          <Tasks currentCaseId={currentCaseId} user={user} />
        </div>
        <div className="col col-md-3 vh-100">
          <h2 className="m-2 mt-4">Activity</h2>
          <CaseMessages
            className="overflow-auto border-top border-dark mt-4 pt-2"
            user={user}
            messages={messages}
          />
          <Suggest
            className="col suggest position-absolute"
            style={{ bottom: "0" }}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            userMessage={userMessage}
            user={user}
            ref={suggestRef}
            selectedSuggestion={selectedSuggestion}
            setselectedSuggestion={setselectedSuggestion}
          />
          <div
            className="col col-12 position-absolute"
            style={{ bottom: "0", right: "0" }}
          >
            <div className="position-relative border-top border-gray row">
              <DebounceInput
                className="w-100 border-0 p-2"
                placeholder="Message"
                minLength={2}
                debounceTimeout={100}
                autoFocus={true}
                value={currentMessage}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  suggestRef.current.handleKeyDown(e, selectedSuggestion);
                }}
              />
              <div
                className="position-absolute"
                style={{ bottom: "5px", right: "10px" }}
              >
                <FontAwesomeIcon
                  icon="location-arrow"
                  className="fa-rotate-315"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualAssistant;
