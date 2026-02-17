import "./todo.css"
import { useState } from "react";
import { TodoForm } from "./TodoForm";

export const Todo = () => {
    const [tasks, setTasks] = useState("");

    const todokey = "reactTodo";
    const [taskList, setTaskList] = useState(() => {
        const rawdata = localStorage.getItem(todokey);
        if (!rawdata) return [];
        return  JSON.parse(rawdata);
    });

    const [datetime, setDatetime] = useState("");
    
    const handleChange = (value) => {
        setTasks(value);
    }

    const handleClear = () => {
        setTaskList([]);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!tasks) return;
        if (taskList.some(task => task.text === tasks)) {
            setTasks("");
            return "Task already exists!";
        }
        setTaskList((taskList) => [...taskList, { text: tasks, completed: false, id : Date.now() }]);
        setTasks("");
    }

    const handleDelete = (index) => {
        setTaskList((prevList) => prevList.filter((_, i) => i !== index));
    }
    
//adding local storage to persist data
    localStorage.setItem(todokey, JSON.stringify(taskList));
    
    const handleToggleCheck = (index) => {
        setTaskList((prevList) => 
            prevList.map((task, i) => 
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    }

    //todo set time and date
    setInterval(() => {
            const a = new Date();
            const currentDate = a.toLocaleDateString();
            const currentTime = a.toLocaleTimeString();
            setDatetime(`${currentDate} - ${currentTime}`);

    }, 1000);
            

    return (
        <div className="todo-container">
            <header className="todo-header">
                <h1>Todo App</h1>
                <h2>{datetime}</h2>
            </header>   

            <TodoForm handleFormSubmit={handleFormSubmit} tasks={tasks} handleChange={handleChange} />
            
            <div className="task-list-section">
                <h2 className="task-list-title">Task List</h2>
                <ul className="task-list">
                    {taskList.map((item, index) => (
                        <li key={index} className={item.completed ? "completed" : ""}>
                           <span className="task-item">{item.text}</span>
                           <button 
                               className="check-btn"
                               type="button"
                               onClick={() => handleToggleCheck(index)}
                           >
                               {item.completed ? "Uncheck" : "Check"}
                           </button>
                           <button
                               className="delete-btn"       
                               type="button"
                               onClick={() => handleDelete(index)}
                           >
                               Delete
                           </button>
                            
                        </li>
                    ))}
                </ul>
            </div>
            <div>
            <button className="clear-btn" onClick={handleClear}>Clear All</button>
            </div>
        </div>
    )
}
