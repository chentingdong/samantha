import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import CreateTask from "./create-task";
import TaskDesign from "./task-design";
import TasksTable from "./tasks-table";
import CaseHeader from "../case/case-header";
import TaskRuntime from "./task-runtime";
import TasksKanban from "./tasks-kanban";
import { Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Tasks({
  currentCaseId,
  lastMessage,
  user,
  currentCaseStatus,
  setCurrentCaseStatus,
}) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentCase, setCurrentCase] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showRuntimeModal, setShowRuntimeModal] = useState(false);

  useEffect(() => {
    apiWrapper.get("/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  async function listCaseTasks() {
    let path = `/cases/${currentCaseId}/tasks`;
    try {
      let resp = await apiWrapper.get(path);
      let caseTasks = resp.data;
      setTasks(caseTasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCurrentCase() {
    try {
      const path = "/cases/" + currentCaseId;
      let resp = await apiWrapper.get(path);
      if (resp.data) setCurrentCase(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    listCaseTasks();
    getCurrentCase();
  }, [currentCaseId]);

  useEffect(() => {
    if (lastMessage) {
      let data = JSON.parse(lastMessage.data);
      if (data.type === "REFRESH" && data.target === "tasks") {
        listCaseTasks();
      }
    }
  }, [lastMessage]);

  return (
    currentCase && (
      <div className="">
        <CaseHeader
          currentCaseId={currentCaseId}
          tasks={tasks}
          currentCaseStatus={currentCaseStatus}
          setCurrentCaseStatus={setCurrentCaseStatus}
        />
        <div className="card mt-4">
          <div className="d-flex pt-2 pb-2 border-bottom">
            <h4 className="col-6">Tasks</h4>
            <div className="col-6 text-right">
              <CreateTask
                currentCaseId={currentCaseId}
                user={user}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setShowDesignModal={setShowDesignModal}
              />
            </div>
          </div>
          <Tabs defaultActiveKey="list" variant="none" className="tasks-tab">
            <Tab
              eventKey="kanban"
              title={
                <FontAwesomeIcon icon="columns" className="text-primary" />
              }
            >
              <TasksKanban
                tasks={tasks}
                setTasks={setTasks}
                users={users}
                setCurrentTask={setCurrentTask}
                setShowDesignModal={setShowDesignModal}
                setShowRuntimeModal={setShowRuntimeModal}
              />
            </Tab>
            <Tab
              eventKey="list"
              title={
                <FontAwesomeIcon icon="list-alt" className="text-primary" />
              }
            >
              <TasksTable
                tasks={tasks}
                users={users}
                setTasks={setTasks}
                setCurrentTask={setCurrentTask}
                setShowDesignModal={setShowDesignModal}
                setShowRuntimeModal={setShowRuntimeModal}
              />
            </Tab>
          </Tabs>
        </div>
        <TaskDesign
          currentCaseId={currentCaseId}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          users={users}
          tasks={tasks}
          setTasks={setTasks}
          showDesignModal={showDesignModal}
          setShowDesignModal={setShowDesignModal}
        />
        <TaskRuntime
          currentCaseId={currentCaseId}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          tasks={tasks}
          setTasks={setTasks}
          showRuntimeModal={showRuntimeModal}
          setShowRuntimeModal={setShowRuntimeModal}
        />
      </div>
    )
  );
}

export default Tasks;
