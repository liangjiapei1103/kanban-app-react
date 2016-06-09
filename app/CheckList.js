import React, { Component, PropTypes } from 'react';

class CheckList extends Component {

    // To check if the user pressed the Enter Key, and to clear the input field
    // adter invoking the callback function
    checkInputKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
            evt.target.vlaue= '';
        }
    }

    render() {

        // Using Map function to transfer tasks object into collection of <li>,
        // and using data from each task
        // Now, tasks is the collection of <li>
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" checked={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
                } />
                {task.name}
                <a href="#" className="checklist__task--remove" onClick={
                    this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
                } />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"
                       onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
