import styled from 'styled-components/macro';
import { primary } from '../Colors.js';

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin: 0;
	padding: 0;
	background-color: #fff;
	text-align: center;

	tr {
		cursor: pointer;

		&:hover {
			background: ${primary};
			color: #fff;
		}
	}

	th {
		color: ${primary};
		text-transform: uppercase;
	}

	th,
	td {
		border: 1px solid #dfdfdf;
		padding: 20px;
	}
`;

export default Table;
