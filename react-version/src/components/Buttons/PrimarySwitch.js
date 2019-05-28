import Switch from 'react-switch';
import { primary } from '../Colors.js';
import React from 'react';
import PropTypes from 'prop-types';

const PrimarySwitch = props => {
	return (
		<div>
			<Switch
				onChange={props.onChange}
				checked={props.checked}
				onColor={primary}
				checkedIcon={false}
				uncheckedIcon={false}
			/>
		</div>
	);
};

PrimarySwitch.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default PrimarySwitch;
