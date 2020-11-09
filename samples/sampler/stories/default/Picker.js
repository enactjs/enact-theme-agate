import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {PickerBase} from '@enact/agate/internal/Picker';
import Picker from '@enact/agate/Picker';

const Config = mergeComponentMetadata('Picker', Picker, PickerBase);

storiesOf('Agate', module)
	.add(
		'Picker',
		() => (
			<div style={{padding: '0 20%'}}>
				<Picker
					aria-label={text('aria-label', Picker, '')}
					decrementAriaLabel={text('decrementAriaLabel', Picker, '')}
					disabled={boolean('disabled', Config)}
					incrementAriaLabel={text('incrementAriaLabel', Picker, '')}
					noAnimation={boolean('noAnimation', Picker)}
					onChange={action('onChange')}
					orientation={select('orientation', ['vertical', 'horizontal'], Config)}
					wrap={boolean('wrap', Picker)}
				>
					{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
				</Picker>
			</div>
		),
		{
			text: 'Basic usage of Picker'
		}
	);
