import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';
import React from 'react';

import FanSpeedControl from '@enact/agate/FanSpeedControl';

import iconNames from './icons';

FanSpeedControl.displayName = 'FanSpeedControl';
const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl);

storiesOf('Agate', module)
	.add(
		'FanSpeedControl',
		() => (
			<div style={{marginTop: '40px'}}>
				<FanSpeedControl
					icon={select('icon', ['', ...iconNames], Config, 'fan')}
				/>
			</div>

		),
		{
			text: 'The basic FanSpeedControl'
		}
	);
