import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateCardStatus(draggedId, props.id)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}


class List extends Component {
    render() {

        const { connectDropTarget } = this.props;

        // Using Map function to transfer cards object to the collection of Card Components
        // that getting id, title, description and tasks as props.
        var cards = this.props.cards.map((card) => {
            return <Card key={card.id}
                         taskCallbacks={this.props.taskCallbacks} // Pass taskCallbacks to Card
                         cardCallbacks={this.props.cardCallbacks}
                         id={card.id}
                         title={card.title}
                         description={card.description}
                         color={card.color}
                         tasks={card.tasks}
                    />
        });


        // when render, return following
        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>  {/* this.props.title is passed from KanbanBoard Component */}
                {cards}  {/* cards is the Card Components from map function */}
            </div>
        );
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
