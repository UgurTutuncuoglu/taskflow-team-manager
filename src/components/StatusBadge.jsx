function StatusBadge({status}){
    const getBadgeClass = () => {
        switch(status){
            case 'Resolved':
                return 'bg-success';
            case 'In Progress':
                return 'bg-primary';
            case 'Team Discussion':
                return 'bg-warning text-dark';
            case 'Closed':
                return 'bg-secondary';
            default:
                return 'bg-danger';
        }
    };

    return (
        <span className = {`badge ${getBadgeClass()}`}>
            {status}
        </span>
    );


}

export default StatusBadge;