import React from 'react';
import { SideBarWrapper } from '../../Layout';
import SideBarItem from './SideBarItem';
import Logo from '../../img/white-text.png';

const Sidebar = () => (
	<SideBarWrapper>
		<img src={Logo} alt='' />
		<SideBarItem title='Login' />
		<SideBarItem title='Current Event' />
		<SideBarItem title='Admin' />
	</SideBarWrapper>
);
export default Sidebar;
