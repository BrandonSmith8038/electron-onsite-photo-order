import React from 'react';
import { SideBarWrapper } from '../../Layout';
import SideBarItem from './SideBarItem';
import Logo from '../../assets/img/white-text-small-min.png';

const Sidebar = props => (
	<SideBarWrapper>
		<img src={Logo} alt='' />
		<SideBarItem title='Login' />
		<SideBarItem title='Current Event' />
		<SideBarItem title='Admin' />
	</SideBarWrapper>
);
export default Sidebar;
