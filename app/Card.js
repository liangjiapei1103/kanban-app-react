import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked'; // import marked to handle markdown
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';
import { Link } from 'react-router';

let titlePropType = (props, propName, componentName) => {
    if (props[propName]) { // Checking whether this prop is null
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 80) { // Checking type and length
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            );
        }
    }
}

const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            status: props.status
        };
    },

    endDrag(props) {
        props.cardCallbacks.persistCardDrag(props.id, props,status);
    }
}

const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateCardPosition(draggedId, props.id);
    }
}

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
}

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Card extends Component {

    constructor() {
        super(...arguments);
        // The state object contains showDetails Boolean
        this.state = {
            showDetails: false
        };
    }

    // Revert showDetails' value when click the title of the card
    // Using setState to manage state
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;

        let cardDetails;
        // If showDetails is true, store details in the cardDetails
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    {/*Correct way to apply markdown*/}
                    <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}} /> {/* desctiption is passed from List Component */}
                    {/*pass taskCallbacks to CheckList */}
                    <CheckList cardId={this.props.id}
                               tasks={this.props.tasks}
                               taskCallbacks={this.props.taskCallbacks}
                    />
                    {/* id and tasks are passed from List Component. Now, pass id and tasks to CheckList as props */}
                </div>
            )
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor}/>
                <div className="card__edit"><Link to={'/edit/' + this.props.id}>&#9998;</Link></div>
                {/*Using condition to decide className*/}
                <div className={
                        this.state.showDetails? "card__title card__title--is-open" : "card__title"
                    } onClick={this.toggleDetails.bind(this)}>  {/* use bind this to call function in the class */}
                    {this.props.title} {/* title is passed from List Component */}
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={250}
                                         transitionLeaveTimeout={250} >
                    {cardDetails}
                </ReactCSSTransitionGroup>

            </div>
        ));
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
