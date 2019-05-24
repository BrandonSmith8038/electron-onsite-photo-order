import Switch from 'react-switch';
import { primary } from '../Colors.js';
import React from 'react';

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

export default PrimarySwitch;
