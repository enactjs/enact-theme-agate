import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {DrumPickerBase} from '@enact/agate/internal/DrumPicker';
import Picker from '@enact/agate/Picker';

Picker.displayName = 'Picker';
const Config = mergeComponentMetadata('Picker', Picker, DrumPickerBase);

export default {
	title: 'Agate/Picker',
	component: 'Picker'
};

export const _Picker = () => (
	<div style={{padding: '0 20%'}}>
		<Picker
			aria-label={text('aria-label', Config, '')}
			decrementAriaLabel={text('decrementAriaLabel', Config, '')}
			disabled={boolean('disabled', Config)}
			incrementAriaLabel={text('incrementAriaLabel', Config, '')}
			noAnimation={boolean('noAnimation', Config)}
			onChange={action('onChange')}
			orientation={select('orientation', ['vertical', 'horizontal'], Config)}
			spotlightDisabled={boolean('spotlightDisabled', Config)}
			wrap={boolean('wrap', Config)}
		>
			{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
		</Picker>
	</div>
);

_Picker.storyname = 'Picker';
_Picker.parameters = {
	info: {
		text: 'Basic usage of Picker'
	}
};
