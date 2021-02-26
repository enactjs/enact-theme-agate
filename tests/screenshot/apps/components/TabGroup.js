import TabGroup from '../../../../TabGroup';

const TabGroupTests = [
	<TabGroup
		tabPosition="before"
		tabs={[
			{title: 'Home', icon: 'home'},
			{title: 'Settings', icon: 'setting'},
			{title: 'Theme', icon: 'display'}
		]}
	/>,
	<TabGroup
		tabPosition="after"
		tabs={[
			{title: 'Home', icon: 'home'},
			{title: 'Settings', icon: 'setting'},
			{title: 'Theme', icon: 'display'}
		]}
	/>
];

export default TabGroupTests;
