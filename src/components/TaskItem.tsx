import { Check, Trash } from "lucide-react";
import { memo } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

interface Task {
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: (text: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className="flex w-full md:w-1/2 m-auto justify-evenly items-center mb-3">
      <p
        className={`text-2xl w-48 md:w-64 lg:w-96 bg-white p-2 rounded-md shadow-md ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => {
            onToggleComplete(task.text);
            toast.success(`Task marked as ${task.completed ? "uncompleted" : "completed"}!`);
          }}
          className="bg-green-400 -translate-y-1.5 cursor-pointer text-white p-2 rounded-md hover:bg-green-500"
        >
          <Check />
        </button>
        <button
          onClick={() =>
            confirmAlert({
              title: "Confirm Deletion",
              message: `Are you sure you want to delete "${task.text}"?`,
              buttons: [{ label: "Yes", onClick: () => onDelete(task.text) }, { label: "No" }],
            })
          }
          className="bg-red-400 cursor-pointer -translate-y-1.5 text-white p-2 rounded-md hover:bg-red-500"
        >
          <Trash />
        </button>
        <button
          onClick={() => onEdit(task)}
          className="bg-amber-500 cursor-pointer -translate-y-1.5 text-white py-2 px-6 rounded-md hover:bg-amber-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default memo(TaskItem);
