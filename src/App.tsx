import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";

//fc for functional component
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") setTask(event.target.value);
    else setDeadline(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const complateTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            name="task"
            placeholder="Task..."
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            placeholder="Deadline (in Days)..."
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        <div className="task">
          <div className="content">
            {todoList.length !== 0 ? (
              <>
                <span>Task Name</span>
                <span
                  style={{
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                >
                  Deadline (in Days)...
                </span>
              </>
            ) : (
              <span
                style={{
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  cursor: "default",
                }}
              >
                No Tasks
              </span>
            )}
          </div>
        </div>
        {todoList.map((task: ITask, index: number) => {
          return (
            <TodoTask key={index} task={task} complateTask={complateTask} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
