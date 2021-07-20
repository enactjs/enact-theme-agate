import {mount} from 'enzyme';

import {RangePicker, RangePickerBase} from '../RangePicker';

import css from '../../internal/DrumPicker/DrumPicker.module.less';

const keyDown = (keyCode) => (picker) => picker.find(`.${css.root}`).first().simulate('keydown', {keyCode});

const upKeyDown = keyDown(38);
const downKeyDown = keyDown(40);

describe('RangePicker Specs', () => {
	beforeEach(() => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => {
			return {
				bottom: 310,
				height: 84,
				left: 45,
				right: 1348,
				top: 226,
				width: 1303,
				x: 45,
				y: 226
			};
		});
	});

	test('should render a single child with the current value', () => {
		const picker = mount(
			<RangePicker min={-10} max={20} value={10} />
		);

		const expected = '10';
		const actual = picker.find('.selectedItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should increase by step amount on increment press', () => {
		const picker = mount(
			<RangePicker defaultValue={10} min={0} max={20} noAnimation step={1} />
		);

		downKeyDown(picker);

		const expected = '11';
		const actual = picker.find('.selectedItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should decrease by step amount on decrement press', () => {
		const picker = mount(
			<RangePicker defaultValue={10} min={0} max={20} noAnimation step={1} />
		);

		upKeyDown(picker);

		const expected = '9';
		const actual = picker.find('.selectedItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should be disabled when limited to a single value', () => {
		const picker = mount(
			<RangePickerBase min={0} max={0} value={0} />
		);

		const actual = picker.find('DrumPicker').last().prop('disabled');
		expect(actual).toBe(true);
	});
});
