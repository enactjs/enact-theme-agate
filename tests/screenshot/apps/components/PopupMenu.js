import PopupMenu from '../../../../PopupMenu';

const PopupMenuTests = [
	<PopupMenu open title="Title">PopupMenu!</PopupMenu>,
	<PopupMenu closeButton open title="Title">PopupMenu!</PopupMenu>,
	<PopupMenu open scrimType="transparent" title="Title">PopupMenu!</PopupMenu>,
	<PopupMenu open title="Title">Very long title to test marquee! Very long title to test marquee! Very long title to test marquee!</PopupMenu>,
	<PopupMenu open closeButton title="Title">Very long title to test marquee! Very long title to test marquee! Very long title to test marquee!</PopupMenu>
];

export default PopupMenuTests;
