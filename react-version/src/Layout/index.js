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
	grid-template-columns: repeat(3, 1fr);
	width: 90%;
`;
