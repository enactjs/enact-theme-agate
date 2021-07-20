import {mount} from 'enzyme';

import DateTimePicker from '../DateTimePicker';
import dateCss from '../../DatePicker/DatePicker.module.less';
import timeCss from '../../TimePicker/TimePicker.module.less';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('DateTimePicker', () => {
	test(
		'should emit an onChange event when changing a component picker',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<DateTimePicker onChange={handleChange} value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
			);

			const base = subject.find('DateComponentRangePicker').first();

			base.prop('onChange')({value: 0});

			const expected = 1;
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	test('should accept a JavaScript Date for its value prop', () => {
		const subject = mount(
			<DateTimePicker value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${dateCss.year}`);

		const expectedYear = 2000;
		const actualYear = yearPicker.prop('value');

		expect(actualYear).toBe(expectedYear);

		const minutePicker = subject.find(`.${timeCss.minutePicker}`).at(0);

		const expectedMinute = 30;
		const actualMinute = minutePicker.prop('value');

		expect(actualMinute).toBe(expectedMinute);
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		const subject = mount(
			<DateTimePicker dayAriaLabel={label} value={new Date(2000, 0, 1, 12, 0)} />
		);

		const dayPicker = subject.find(`DateComponentRangePicker.${dateCss.day}`);

		const expected = label;
		const actual = dayPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		const subject = mount(
			<DateTimePicker monthAriaLabel={label} value={new Date(2000, 0, 1, 12, 0)} />
		);

		const monthPicker = subject.find(`DateComponentRangePicker.${dateCss.month}`);

		const expected = label;
		const actual = monthPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		const subject = mount(
			<DateTimePicker value={new Date(2000, 0, 1, 12, 0)} yearAriaLabel={label} />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${dateCss.year}`);

		const expected = label;
		const actual = yearPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		const subject = mount(
			<DateTimePicker hourAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const hourPicker = subject.find(`.${timeCss.hourPicker}`).at(0);

		const expected = label;
		const actual = hourPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		const subject = mount(
			<DateTimePicker meridiemAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const meridiemPicker = subject.find(`.${timeCss.meridiemPicker}`).at(0);

		const expected = label;
		const actual = meridiemPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		const subject = mount(
			<DateTimePicker minuteAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const minutePicker = subject.find(`.${timeCss.minutePicker}`).at(0);

		const expected = label;
		const actual = minutePicker.prop('aria-label');

		expect(actual).toBe(expected);
	});
});
