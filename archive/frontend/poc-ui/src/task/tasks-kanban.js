/**
 * kanban view for tasks.
 **/
import React, { useEffect, useState } from "react";
import Board, { addCard } from "@lourenci/react-kanban";
import apiWrapper from "../libs/api-wrapper";

const TasksKanban = ({
  tasks,
  setTasks,
  users,
  setCurrentTask,
  setShowDesignModal,
  setShowRuntimeModal,
}) => {
  let kanban = {
    columns: [
      {
        id: 1,
        title: "Pending",
        cards: [],
      },
      {
        id: 2,
        title: "Active",
        cards: [],
      },
      {
        id: 3,
        title: "Complete",
        cards: [],
      },
    ],
  };
  const [board, setBoard] = useState(kanban);

  async function updateCurrentTaskState(currentTask, state) {
    let path = `/tasks/${currentTask.id}/${state}`;
    await apiWrapper.patch(path);
  }

  function handleStateChange(card, source, destination) {
    let newBoard = Object.assign({}, board);
    newBoard.columns.forEach((column) => {
      if (column.id === source.fromColumnId) {
        column.cards.splice(column.cards.indexOf(card), 1);
      }
      if (column.id === destination.toColumnId) {
        column.cards.push(card);
        let newTasks = tasks;
        newTasks.forEach((task) => {
          if (task.id === card.id) {
            updateCurrentTaskState(task, column.title);
          }
        });
        setTasks(newTasks);
      }
    });
    setBoard(newBoard);
  }
  useEffect(() => {
    function loadCards() {
      kanban.columns.forEach((column) => {
        tasks.forEach((task) => {
          if (column.title === task.state) {
            let title = <CardTitle task={task} users={users} />;
            const card = {
              id: task.id,
              title: title,
              description: task.data.description,
            };
            column.cards.push(card);
          }
        });
      });
      setBoard(kanban);
    }
    loadCards();
  }, [tasks]);

  return (
    <div>
      <Board allowAddCard className="row" onCardDragEnd={handleStateChange}>
        {board}
      </Board>
    </div>
  );
};

function CardTitle({ task, users }) {
  function getUserAttribute(username, attr) {
    try {
      let user = users.filter((u) => {
        return u.username === username;
      });
      if (user.length === 1) return user[0].attributes[attr];
    } catch (err) {
      console.error("Error getting user attribute: ", err);
    }
  }
  return (
    <div className="">
      <div className="mr-4">{task.data.name}</div>
      <div className="">
        {task.data.participants &&
          task.data.participants.map((participant, index) => {
            return (
              <img
                className="thumbnail rounded-circle text-right"
                key={index}
                src={getUserAttribute(participant, "picture")}
                alt=""
              />
            );
          })}
      </div>
    </div>
  );
}
export default TasksKanban;
