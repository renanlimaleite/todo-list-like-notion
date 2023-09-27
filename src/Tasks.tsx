import './tasks.css'
import {
  BsClipboard2,
  BsClipboard2Check,
  BsClipboard2Minus,
  BsFillTrash3Fill,
} from "react-icons/bs";

type Status = 'todo' | 'in-progress' | 'completed';

type TasksProps = {
  id: number;
  status: Status;
  description: string;
  author: string;
  date: string;
  handleChangeStatus: (status: string, id: number) => void;
  handleRemoveTask: (id: number) => void;
};



function getIconByStatus(status: Status) {
  const icons: Record<Status, JSX.Element> = {
    todo: <BsClipboard2 size={24} />,
    "in-progress": <BsClipboard2Minus size={24} />,
    completed: <BsClipboard2Check size={24} />,
  };

  return icons[status];
}


export function Tasks({
  id,
  status,
  description,
  author,
  date,
  handleChangeStatus,
  handleRemoveTask,
}: TasksProps) {
  return (
    <div className="todo-app-tasks">
      <div
        className="status cursor-pointer"
        onClick={() => handleChangeStatus(status, id)}
      >
        {getIconByStatus(status)}
      </div>
      <div className="task">{description}</div>
      <div className="author">{author}</div>
      <div className="date">{date}</div>
      <div className="actions" onClick={() => handleRemoveTask(id)}>
        <BsFillTrash3Fill size={24} color="#ff0000" />
      </div>
    </div>
  );
}
