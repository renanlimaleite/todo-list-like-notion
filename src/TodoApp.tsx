import { FormEvent, useState } from "react";
import "./todo-app.css";
import { mockTasks } from "./mock-tasks";
import { Tasks } from "./Tasks";
import { createPortal } from "react-dom";
import { Modal } from "./modal";
import { transformDateToBRL } from "./shared/transforms";

export type CustomFormElement = HTMLFormElement & {
  description: HTMLInputElement;
  author: HTMLInputElement;
  date: HTMLInputElement;
}

export function TodoApp() {
  const [tasks, setTasks] = useState(mockTasks);
  const [openModal, setOpenModal] = useState(false);

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function changeStatus(currentStatus: string) {
    if (currentStatus === "todo") return "in-progress";
    if (currentStatus === "in-progress") return "completed";
    if (currentStatus === "completed") return "todo";
    return "todo";
  }

  function handleChangeStatus(status: string, id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: changeStatus(status),
          };
        }
        return task;
      })
    );
  }

  function handleSubmit(evt: FormEvent<CustomFormElement>) {
    evt.preventDefault()
    const target = evt.currentTarget

    setTasks(prevTasks => ([
      ...prevTasks,
      {
        id: new Date().getMilliseconds(),
        status: 'todo',
        description: target.description.value,
        author: target.author.value,
        date: transformDateToBRL(target.date.value)
      }
    ]))

    setOpenModal(false)
  }

  return (
    <>
      <div className="todo-app-container">
        <div className="todo-app-button-wrapper">
          <button 
            onClick={() => setOpenModal(true)}
            className="todo-app-create-button">
            Nova tarefa
          </button>
        </div>
        <div className="todo-app-header">
          <div className="status header">Status</div>
          <div className="task">Nome da tarefa:</div>
          <div className="author">Autor:</div>
          <div className="date">Até:</div>
          <div className="actions">Ações:</div>
        </div>
        {!!tasks.length &&
          tasks.map((task) => (
            <Tasks
              id={task.id}
              key={task.id}
              author={task.author}
              description={task.description}
              date={task.date}
              status={task.status}
              handleChangeStatus={handleChangeStatus}
              handleRemoveTask={handleRemoveTask}
            />
          ))}
      </div>

      {openModal && createPortal(
        <Modal 
          handleSubmit={handleSubmit}
          setOpenModal={setOpenModal}
        />,
        document.body
      )}
    </>
  );
}
