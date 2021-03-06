import DateTimePicker from '@enact/agate/DateTimePicker';

import Section from '../components/Section';

const DatePickerView = () => (
	<>
		<Section title="Default">
			<DateTimePicker alt="Normal" />
			<DateTimePicker alt="Disabled" disabled />
		</Section>
	</>
);

export default DatePickerView;
