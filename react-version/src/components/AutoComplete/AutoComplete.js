import styled from 'styled-components/macro';
import { primary, hint } from '../Colors.js';

const AutoComplete = styled.div`
	color: ${hint};
	cursor: pointer;
	/* margin: 15px 0; */

	li {
		list-style: none;
		box-shadow: 10px 13px 29px -14px ${hint};
		transition: 0.5s;
		&:hover {
			color: ${primary};
		}
	}
`;
export default AutoComplete;
