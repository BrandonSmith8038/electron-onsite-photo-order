import styled from 'styled-components/macro';
import { primary } from '../Colors.js';

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin: 10px 0 0 0;
	padding: 0;
	background-color: #fff;
	text-align: center;

	tr {
		cursor: pointer;

		&:hover {
			background: ${primary};
			color: #fff;
		}

		td {
			&:last-of-type {
				border: none;

				&:hover {
					background: #fff;
					color: black;
				}
			}
		}
	}
	thead {
		tr {
			cursor: initial;
			&:hover {
				background: #fff;
				color: black;
			}
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
