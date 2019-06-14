import styled from 'styled-components/macro';
import { primary } from '../components/Colors.js';

export const MainWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	position: relative;
	width: 100%;
`;

export const AppWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
`;

export const HomeButtonWrapper = styled.div`
	display: grid;
	grid-gap: 15px;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
	width: 90%;
`;

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	width: ${props => props.width};
`;

export const TableWrapper = styled.form`
	display: flex;
	flex-direction: column;
	width: ${props => props.width};
`;

export const FormRow = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-bottom: 10px;

	> * {
		margin-right: 30px;
	}
`;

export const SideBarWrapper = styled.div`
	display: flex;
	background: ${primary};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-right: 3px solid #444;
	position: relative;

	img {
		position: absolute;
		max-width: 100%;
		top: 30px;
	}
`;
