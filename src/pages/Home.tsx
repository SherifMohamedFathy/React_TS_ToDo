// import InputList from "../components/InputList";
import { Edit } from "lucide-react";
import TaskInput from "../components/TaskInput";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 min-h-screen flex flex-col ">
      <div className="flex  items-center justify-center ">
        <h1 className="text-3xl text-white text-center mt-10 font-bold">Todo App</h1>
        <span className="text-center text-sm translate-x-[15px] translate-y-[25px] text-red-400 ">
          <Edit />
        </span>
      </div>

      <TaskInput />
    </div>
  );
};

export default Home;
