import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import Checkbox, {CheckboxBase} from '@enact/agate/Checkbox';
import CheckboxItem, {CheckboxItemBase} from '@enact/agate/CheckboxItem';
import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';

import iconNames from './icons';

const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxBase, Checkbox, CheckboxItemBase, CheckboxItem);
Config.defaultProps.icon = CheckboxBase.defaultProps.children;

export default {
	title: 'Agate/CheckboxItem',
	component: 'CheckboxItem'
}

export const _CheckboxItem = () => {
	const slotBeforeSelection = select('slotBefore', ['', ...iconNames], Config);
	const slotBefore = slotBeforeSelection ? (<Icon slot="slotBefore">{slotBeforeSelection}</Icon>) : null;

	return (
		<CheckboxItem
			disabled={boolean('disabled', Config)}
			icon={select('icon', iconNames, Config)}
			indeterminate={boolean('indeterminate', Config)}
			indeterminateIcon={select('indeterminateIcon', iconNames, Config)}
			inline={boolean('inline', Config)}
			label={text('label', Config)}
			labelPosition={select('labelPosition', ['above', 'after', 'before', 'below'], Config)}
			onToggle={action('onToggle')}
		>
			{slotBefore}
			{text('children', Config, 'Hello CheckboxItem')}
		</CheckboxItem>
	);
};

_CheckboxItem.storyName = 'CheckboxItem';
_CheckboxItem.parameters = {
	info: {
		text: 'The basic CheckboxItem'
	}
};
