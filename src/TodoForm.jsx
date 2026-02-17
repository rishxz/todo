export const TodoForm = ({ handleFormSubmit, tasks, handleChange }) => {
    return (
        <form onSubmit={handleFormSubmit} className="todo-form">
            <div className="input-group">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Enter a task"
                    value={tasks}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="button-group">
                <button type="submit" className="add-btn">
                    Add Task
                </button>
            </div>
        </form>
    );
};