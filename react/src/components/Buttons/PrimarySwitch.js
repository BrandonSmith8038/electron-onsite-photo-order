import Switch from 'react-switch';
import { primary, hint } from '../Colors.js';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const LabelSwitch = styled.span`
	display: block;
	color: ${hint};
`;
const PrimarySwitch = props => {
	return (
		<div>
			<label>
				<LabelSwitch>Need Address</LabelSwitch>
				<Switch
					onChange={props.onChange}
					checked={props.checked}
					onColor={primary}
					checkedIcon={false}
					uncheckedIcon={false}
					height={18}
					width={40}
				/>
			</label>
		</div>
	);
};

PrimarySwitch.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default PrimarySwitch;
