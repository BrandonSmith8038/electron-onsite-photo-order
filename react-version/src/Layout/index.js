import styled from 'styled-components/macro';

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
	grid-template-columns: 1fr 3fr;
`;

export const HomeButtonWrapper = styled.div`
	display: grid;
	grid-gap: 15px;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	width: 90%;
`;

export const FormWrapper = styled.form`
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
