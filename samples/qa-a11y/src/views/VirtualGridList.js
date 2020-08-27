import CheckboxItem from '@enact/agate/CheckboxItem';
import ImageItem from '@enact/agate/ImageItem';
import {VirtualGridList} from '@enact/agate/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';

const
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({index, ...rest}) => {
		const {caption, label, src} = items[index];

		return (
			<ImageItem
				{...rest}
				src={src}
				label={label}
			>
				{caption}
			</ImageItem>
		);
	};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		caption = `Item ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		label = `SubItem ${count}`,
		src = {
			'hd': `http://placehold.it/200x200/${color}/ffffff&text=Image ${i}`,
			'fhd': `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`,
			'uhd': `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`
		};

	items.push({caption, label, src});
}

class VirtualGridListView extends React.Component {
	constructor () {
		super();
		this.state = {
			isHorizontalList: false,
			isNative: true
		};
	}

	onToggleOrientation = () => this.setState((state) => ({isHorizontalList: !state.isHorizontalList}));

	onToggleScrollMode = () => this.setState((state) => ({isNative: !state.isNative}));

	render () {
		const
			{isHorizontalList, isNative} = this.state,
			scrollMode = isNative ? 'native' : 'translate';

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<CheckboxItem
						onToggle={this.onToggleOrientation}
						selected={isHorizontalList}
					>
						Horizontal
					</CheckboxItem>
					<CheckboxItem
						onToggle={this.onToggleScrollMode}
						selected={isNative}
					>
						Native
					</CheckboxItem>
				</Cell>
				<VirtualGridList
					dataSize={items.length}
					direction={isHorizontalList ? 'horizontal' : 'vertical'}
					itemRenderer={renderItem}
					itemSize={{
						minWidth: ri.scale(678), // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
						minHeight: ri.scale(678) // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
					}}
					scrollMode={scrollMode}
				/>
			</Layout>
		);
	}
}

export default VirtualGridListView;
