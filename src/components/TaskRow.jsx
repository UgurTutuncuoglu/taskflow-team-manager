import StatusBadge from "./StatusBadge";

function TaskRow({ task, deleteTask, setEditingTask }) {
    const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('tr-TR');
    };
  
    return (
    <tr>
      <td>{task.taskName}</td>
      <td>{task.assignedPerson}</td>
      <td className="text-nowrap">{formatDate(task.startDate)}</td>
      <td className="text-nowrap">{formatDate(task.endDate)}</td>
      <td>{task.estimatedHours}h</td>
      <td>
        <StatusBadge status={task.status} />
      </td>
      <td>{task.description}</td>
      <td>
        <div className="d-flex flex-column gap-2">
           <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => setEditingTask(task)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTask(task.id)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
        </div>      
      </td>
    </tr>
  );
}

export default TaskRow;