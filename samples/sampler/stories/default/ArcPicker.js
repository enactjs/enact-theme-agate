import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ArcPicker, {ArcPickerBase} from '@enact/agate/ArcPicker';

ArcPicker.displayName = 'ArcPicker';
const Config = mergeComponentMetadata('FanSpeedControl', ArcPicker, ArcPickerBase);

storiesOf('Agate', module)
	.add(
		'ArcPicker',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 40}, 8);
			const items = (new Array(itemCount)).fill().map((i, index) => index + 1);

			return (
				<ArcPicker
					endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
					options={items}
					selectionType={select('selectionType', ['cumulative', 'single'], Config, 'cumulative')}
					setValue={action('setValue')}
					startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
					style={{marginTop: '40px'}}
				/>
			);
		},
		{
			text: 'The basic ArcPicker'
		}
	);
