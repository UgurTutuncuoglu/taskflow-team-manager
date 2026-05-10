import TaskRow from './TaskRow';


function TaskTable({ tasks, deleteTask, setEditingTask }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-4">Task List</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Task</th>
                <th>Assigned</th>
                <th>Start</th>
                <th>End</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

             <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    setEditingTask={setEditingTask}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskTable;