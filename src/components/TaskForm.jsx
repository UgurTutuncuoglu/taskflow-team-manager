import { useState,useEffect } from "react";
import { taskTemplate } from "../interfaces/Task";

function TaskForm({addTask, editingTask, updateTask}){
    const [task,setTask] = useState(taskTemplate);

    useEffect(() => {
        if(editingTask){
            setTask(editingTask);
        }
    }, [editingTask]);

    const handleChange = (e) => {
        const {name, value} = e.target;


        setTask ({...task,[name]:value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();


     // Boş alan kontrolü
        if (
            !task.taskName.trim() ||
            !task.assignedPerson.trim() ||
            !task.startDate ||
            !task.endDate ||
            !task.estimatedHours
        ) {
            alert("Please fill all required fields.");
            return;
        }


        const isValidDate = (dateString) => {

            // YYYY-MM-DD format kontrolü
            const regex = /^\d{4}-\d{2}-\d{2}$/;

            if (!regex.test(dateString)) {
                return false;
            }

            const date = new Date(dateString);

            // Geçerli tarih mi kontrolü
            return !isNaN(date.getTime());
        };

        if (
            !isValidDate(task.startDate) ||
            !isValidDate(task.endDate)
        ) {
            alert("Dates must be valid and in YYYY-MM-DD format.");
            return;
        }
        
    

        // Start Date > End Date kontrolü
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);

        if (start > end) {
            alert("Start Date cannot be later than End Date.");
            return;
        }

        // Estimated Hours negatif kontrolü
            const hours = Number(task.estimatedHours);

        if (!Number.isInteger(hours) || hours <= 0) {
            alert("Estimated Hours must be a positive integer.");
            return;
        }

        //Tahmini zaman üst limit
        if (hours > 1000) {
            alert("Estimated Hours cannot exceed 1000.");
            return;
        }


    if(editingTask){
        updateTask(task);
    } else {
        addTask({...task, id: Date.now()});
    }

    
    setTask(taskTemplate);

    }


    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h4 className="mb-4">
                    {editingTask ? 'Update Task' : 'Add New Task'}
                </h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Task Name</label>
                        <input type="text"
                        className="form-control"
                        name = "taskName"
                        value = {task.taskName}
                        onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Assigned Person</label>
                        <input type="text"
                        className="form-control"
                        name = "assignedPerson"
                        value = {task.assignedPerson}
                        onChange = {handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Start Date</label>
                            <input type="date"
                            className="form-control"
                            name = "startDate"
                            value = {task.startDate}
                            onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">End Date</label>
                            <input type="date"
                            className = "form-control"
                            name = "endDate"
                            value = {task.endDate}
                            onChange={handleChange} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Estimated Hours</label>
                        <input type="number"
                        className="form-control"
                        name = "estimatedHours"
                        value = {task.estimatedHours}
                        onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-select"
                        name="status"
                        value = {task.status}
                        onChange={handleChange}>
                            <option>Unresolved</option>
                            <option>In Progress</option>
                            <option>Team Discussion</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                        className="form-control"
                        rows="3"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        ></textarea>
                    </div>

                    <button className="btn btn-dark w-100">
                        {editingTask ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
            </div>
        </div>
    );

}

export default TaskForm;