import TaskItem from "./TaskItem";

interface Props {
  tasks: { text: string; completed: boolean }[];
  onDelete(text: string): void;
  onEdit(task: { text: string; completed: boolean }): void;
  onToggleComplete(text: string): void;
}

const InputList = ({ tasks, onDelete, onEdit, onToggleComplete }: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.text} task={task} onDelete={onDelete} onEdit={onEdit} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default InputList;
