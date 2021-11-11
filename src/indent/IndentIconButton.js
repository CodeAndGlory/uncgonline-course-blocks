import CustomIcon from "../custom-icons";

class IndentIconButton extends React.Component {
	constructor(props) {
		super(props);

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.iconSelectedHandler(this.props.icon);
	}

	render() {
		return (
			<button
				className={ `${this.props.selectedIcon === this.props.icon ? 'selected' : ''} btn btn-light` }
				onClick={this.handleClick}
			>
				<CustomIcon icon={this.props.icon} />
			</button>
		);
	}
}

export default IndentIconButton;
