import classNames from 'classnames';
import React from 'react';

import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
	// Button Background Color
	redButton: {
		width: '50%',
		color: 'white',
		backgroundColor: red[800],
		'&:hover': {
			backgroundColor: red[900],
		},
	},
});

const RedButton = props => {
	const { classes } = props;
	return (
		<Button
			// type={props.type ? props.type : ''}
			variant='contained'
			fullWidth={props.fullWidth}
			disabled={props.disabled}
			onClick={props.onClick}
			value={props.value}
		/>
	);
};

// RedButton.propTypes = {
// 	type: PropTypes.string,
// 	fullWidth: PropTypes.bool,
// 	disabled: PropTypes.bool,
// 	onClick: PropTypes.func,
// 	value: PropTypes.string.isRequired,
// };

export default RedButton;
