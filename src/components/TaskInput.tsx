// import { useEffect, useRef, useState } from "react";
// import InputList from "./InputList";
// import toast from "react-hot-toast";
// import SearchBar from "./SearchBar";

// type Task = {
//   text: string;
//   completed: boolean;
// };
// const TaskInput = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [query, setQuery] = useState<string>("");
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
//   const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">("all");

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     let filtered = tasks;
//     if (query.trim()) {
//       filtered = tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
//     }

//     if (filter === "completed") {
//       filtered = filtered.filter((task) => task.completed);
//     } else if (filter === "uncompleted") {
//       filtered = filtered.filter((task) => !task.completed);
//     }
//     setFilteredTasks(filtered);
//   }, [query, tasks, filter]);

//   const handleDelete = (text: string) => {
//     setTasks((prevTasks) => prevTasks.filter((t) => t.text !== text));
//   };
//   const handleStartEdit = (task: Task) => {
//     setIsEditing(true);
//     setEditingTask(task);
//     setInputValue(task.text);
//     inputRef.current?.focus();
//   };
//   const handleUpdate = () => {
//     if (!inputValue.trim()) return toast.error("Task cannot be empty");
//     if (!editingTask) return;

//     if (inputValue === editingTask.text) return toast.error("No changes made");

//     setTasks((prev) => prev.map((t) => (t.text === editingTask.text ? { ...t, text: inputValue } : t)));
//     toast.success("Task updated successfully!");
//     setInputValue("");
//     setEditingTask(null);
//     setIsEditing(false);
//   };

//   const toggleComplete = (text: string) => {
//     setTasks((prev) => prev.map((t) => (t.text === text ? { ...t, completed: !t.completed } : t)));
//   };

//   const handleAddTask = () => {
//     if (!inputValue.trim()) return;
//     setTasks((prev) => [...prev, { text: inputValue, completed: false }]);
//     toast.success("Task added!");
//     setInputValue("");
//   };

//   return (
//     <div className="flex flex-col">
//       <form
//         className="m-auto flex items-center mt-4 justify-between p-4 rounded-lg"
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (isEditing) {
//             handleUpdate();
//           } else {
//             handleAddTask();
//           }
//         }}
//         autoComplete="off"
//       >
//         <input
//           ref={inputRef}
//           onChange={(e) => setInputValue(e.target.value)}
//           value={inputValue}
//           type="text"
//           className="bg-white mr-4 outline-0 border-0 w-48 md:w-64 lg:w-96 py-2 px-4 rounded-md"
//           placeholder="Start Typing"
//           aria-label="Task input"
//         />
//         <button
//           type="submit"
//           disabled={inputValue.trim() === ""}
//           className="py-2 rounded-md text-[17px] px-6 bg-red-400 text-white cursor-pointer hover:bg-red-500 transition-all duration-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isEditing ? "Update Task" : "Add Task"}
//         </button>
//         <select
//           onChange={(e) => setFilter(e.target.value as "all" | "completed" | "uncompleted")}
//           className="ml-4 cursor-pointer py-2 text-[17px] px-3 border-0 bg-green-600 rounded-md text-white"
//         >
//           <option value="all">All</option>
//           <option value="completed">Completed</option>
//           <option value="uncompleted">Uncompleted</option>
//         </select>
//       </form>
//       <SearchBar onSearch={setQuery} />
//       <div className="w-full mt-1">
//         {filteredTasks.length === 0 ? (
//           <p className="text-center text-gray-500">No tasks added yet.</p>
//         ) : (
//           <InputList
//             tasks={filteredTasks}
//             onDelete={handleDelete}
//             onEdit={handleStartEdit}
//             onToggleComplete={toggleComplete}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskInput;
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InputList from "./InputList";
import SearchBar from "./SearchBar";

type Task = {
  text: string;
  completed: boolean;
};

const TaskInput = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [query, setQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">("all");

  const inputRef = useRef<HTMLInputElement>(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
    inputRef.current?.focus();
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on search and filter value
  useEffect(() => {
    let result = tasks;
    if (query.trim()) {
      result = result.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
    }
    if (filter === "completed") {
      result = result.filter((task) => task.completed);
    } else if (filter === "uncompleted") {
      result = result.filter((task) => !task.completed);
    }
    setFilteredTasks(result);
  }, [tasks, query, filter]);

  const handleAddTask = () => {
    if (!inputValue.trim()) return toast.error("Task cannot be empty");
    setTasks([...tasks, { text: inputValue.trim(), completed: false }]);
    toast.success("Task added!");
    setInputValue("");
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;
    if (!inputValue.trim()) return toast.error("Task cannot be empty");
    if (inputValue === editingTask.text) return toast.error("No changes made");

    const updated = tasks.map((task) => (task.text === editingTask.text ? { ...task, text: inputValue.trim() } : task));
    setTasks(updated);
    toast.success("Task updated!");
    setIsEditing(false);
    setEditingTask(null);
    setInputValue("");
  };

  const handleDelete = (text: string) => {
    setTasks(tasks.filter((task) => task.text !== text));
  };

  const handleEdit = (task: Task) => {
    setIsEditing(true);
    setEditingTask(task);
    setInputValue(task.text);
    inputRef.current?.focus();
  };

  const handleToggleComplete = (text: string) => {
    setTasks(tasks.map((task) => (task.text === text ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="flex flex-col">
      <form
        className="m-auto flex items-center mt-4 justify-between p-4 rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleUpdateTask() : handleAddTask();
        }}
        autoComplete="off"
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="bg-white mr-4 outline-0 border-0 w-48 md:w-64 lg:w-96 py-2 px-4 rounded-md"
          placeholder="Start Typing"
        />
        <button
          type="submit"
          disabled={inputValue.trim() === ""}
          className="py-2 rounded-md text-[17px] px-6 bg-red-400 text-white cursor-pointer hover:bg-red-500 transition-all duration-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
        <select
          onChange={(e) => setFilter(e.target.value as any)}
          className="ml-4 cursor-pointer py-2 text-[17px] px-3 border-0 bg-green-600 rounded-md text-white"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </form>

      <SearchBar onSearch={setQuery} />

      <div className="w-full mt-1">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <InputList
            tasks={filteredTasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default TaskInput;
