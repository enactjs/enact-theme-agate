import DateTimePicker from '../../../../DateTimePicker';

const DateTimePickerTests = [
	<DateTimePicker value={new Date(2021, 6, 15, 1, 12, 30)} />,
	<DateTimePicker disabled value={new Date(2021, 6, 15, 1, 12, 30)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DateTimePicker value={new Date(2021, 6, 15, 1, 12, 30)} />
	},
	{
		locale: 'ar-SA',
		component: <DateTimePicker disabled value={new Date(2021, 6, 15, 1, 12, 30)} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <DateTimePicker disabled value={new Date(2021, 6, 15, 1, 12, 30)} />
	}
];

export default DateTimePickerTests;
