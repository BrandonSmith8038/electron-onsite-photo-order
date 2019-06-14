import React from 'react';
import { SideBarWrapper } from '../../Layout';
import SideBarItem from './SideBarItem';
import Logo from '../../assets/img/white-text-small-min.png';

const Sidebar = props => {
	const { setPage } = props;
	return (
		<SideBarWrapper>
			<img
				src={Logo}
				alt=''
				onClick={() => setPage('Home')}
				style={{ cursor: 'pointer' }}
			/>
			<SideBarItem title='Login' />
			<SideBarItem
				title='Current Event'
				onClick={() => setPage('Current Event')}
			/>
			<SideBarItem title='Admin' />
		</SideBarWrapper>
	);
};
export default Sidebar;
