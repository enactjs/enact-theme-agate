import {mount} from 'enzyme';

import DrumPicker from '../DrumPicker';
import DrumPickerItem from '../DrumPickerItem';

import css from '../DrumPicker.module.less';

const keyDown = (keyCode) => (picker) => picker.find(`.${css.root}`).first().simulate('keydown', {keyCode});

const upKeyDown = keyDown(38);
const downKeyDown = keyDown(40);

describe('Picker Specs', () => {
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

	test('should have a default \'value\' of 0', () => {
		const picker = mount(
			<DrumPicker max={0} min={0} />
		);

		const expected = 0;
		const actual = picker.find('DrumPicker').prop('value');

		expect(actual).toBe(expected);
	});

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <div>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<DrumPicker max={5} min={0} value={0} onChange={handleChange} type="number">
					<DrumPickerItem key={0} marqueeDisabled style={{direction: 'ltr'}}>{0}</DrumPickerItem>
				</DrumPicker>
			);
			downKeyDown(picker);

			const expected = 1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <div>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<DrumPicker max={1} min={-1} value={0} onChange={handleChange} />
			);

			upKeyDown(picker);

			const expected = -1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should not run the onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<DrumPicker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />
		);

		downKeyDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<DrumPicker max={6} min={0} onChange={handleChange} step={3} value={0} />
		);

		downKeyDown(picker);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<DrumPicker max={3} min={0} onChange={handleChange} step={3} value={3} />
		);

		upKeyDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should have no increment button when there is no value to increment',
		() => {
			const picker = mount(
				<DrumPicker max={2} min={0} value={2} />
			);

			const expected = false;
			const actual = picker.find(`.${css.itemIncrement}`).exists();

			expect(actual).toBe(expected);
		}
	);

	test('should have no decrement button when there is no value to decrement',
		() => {
			const picker = mount(
				<DrumPicker max={2} min={0} value={0} />
			);

			const expected = false;
			const actual = picker.find(`.${css.itemDecrement}`).exists();

			expect(actual).toBe(expected);
		}
	);
});
