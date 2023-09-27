import { BsXOctagonFill } from "react-icons/bs";
import { CustomFormElement } from "./TodoApp";
import { FormEvent } from "react";

type ModalProps = {
  setOpenModal: (status: boolean) => void
  handleSubmit: (evt: FormEvent<CustomFormElement>) => void
}

export function Modal({ setOpenModal, handleSubmit }: ModalProps) {
  return (
    <div className="modal-create-task">
      <div className="modal-overlay" onClick={() => setOpenModal(false)}></div>
      <div className="modal-create-task-form">
        <div
          className="modal-create-task-close-button-wrapper"
          onClick={() => setOpenModal(false)}
        >
          <BsXOctagonFill size={24} />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Tarefa" name="description" />
          <input type="text" placeholder="Autor" name="author" />
          <input type="date" placeholder="Prazo" name="date" />
          <button className="todo-app-create-button" type="submit">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}
