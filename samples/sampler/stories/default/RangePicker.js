import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import {DrumPickerBase} from '@enact/agate/internal/DrumPicker';
import RangePicker from '@enact/agate/RangePicker';

const Config = mergeComponentMetadata('RangePicker', RangePicker, DrumPickerBase);

storiesOf('Agate', module)
	.add(
		'RangePicker',
		() => (
			<RangePicker
				defaultValue={5}
				disabled={boolean('disabled', Config)}
				max={number('max', Config, 20)}
				min={number('min', Config, 0)}
				noAnimation={boolean('noAnimation', Config)}
				onChange={action('onChange')}
				orientation={select('orientation', ['vertical', 'horizontal'], Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
				step={number('step', Config)}
				wrap={boolean('wrap', Config)}
			/>
		),
		{
			text: 'Basic usage of RangePicker'
		}
	);
