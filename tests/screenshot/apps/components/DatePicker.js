import DatePicker from '../../../../DatePicker';

const DatePickerTests = [
	<DatePicker value={new Date(2021, 6, 15)} />,
	<DatePicker disabled value={new Date(2021, 6, 15)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DatePicker value={new Date(2021, 6, 15)} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker disabled value={new Date(2021, 6, 15)} />
	}
];

export default DatePickerTests;
