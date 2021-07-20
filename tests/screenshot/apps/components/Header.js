import Header from '../../../../Header';

const HeaderTests = [
	<Header hideLine title="Header Title" />,
	<Header subtitle="Subtitle" title="Header Title" />,
	<Header title="Header Title" titleAbove="Title above" />,
	<Header
		title="Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title"
	/>,
	<Header
		subtitle="Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle Very long subtitle"
		title="Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title"
	/>,
	<Header
		title="Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title Header Very Long Title"
		titleAbove="Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above Very long title above"
	/>
];

export default HeaderTests;
