import React from 'react';
import {mount} from 'enzyme';
import ToggleButton from '../ToggleButton';

describe('ToggleButton', () => {

	const toggleOnLabel = 'IT\'S ON!';
	const toggleOffLabel = 'IT\'S OFF!';
	const textChild = 'TOGGLE ME';

	test('should use \'toggleOffLabel\' if toggled off and label provided', function () {
		const toggleButton = mount(
			<ToggleButton toggleOffLabel={toggleOffLabel}>
				{textChild}
			</ToggleButton>
		);

		const button = toggleButton.find('Button');
		const expected = toggleOffLabel.toUpperCase();
		const actual = button.text();

		expect(actual).toBe(expected);
	});

	test('should use \'toggleOnLabel\' if toggled on and label provided', function () {
		const toggleButton = mount(
			<ToggleButton toggleOnLabel={toggleOnLabel} selected>
				{textChild}
			</ToggleButton>
		);

		const button = toggleButton.find('Button');
		const expected = toggleOnLabel.toUpperCase();
		const actual = button.text();

		expect(actual).toBe(expected);
	});

	test('should use child node for label when \'toggleOffLabel\' is missing', function () {
		const toggleButton = mount(
			<ToggleButton toggleOnLabel={toggleOnLabel}>
				{textChild}
			</ToggleButton>
		);
		const button = toggleButton.find('Button');

		const expected = textChild.toUpperCase();
		const actual = button.text();

		expect(actual).toBe(expected);
	});

	test('should use child node for label when \'toggleOnLabel\' is missing', function () {
		const toggleButton = mount(
			<ToggleButton toggleOffLabel={toggleOffLabel} selected>
				{textChild}
			</ToggleButton>
		);
		const button = toggleButton.find('Button');

		const expected = textChild.toUpperCase();
		const actual = button.text();

		expect(actual).toBe(expected);
	});

	test('should set "aria-pressed" to the value of "selected"', function () {
		const toggleButton = mount(
			<ToggleButton toggleOffLabel={toggleOffLabel} selected={false}>
				{textChild}
			</ToggleButton>
		);

		const expected = false;
		const actual = toggleButton.find({role: 'button'}).prop('aria-pressed');

		expect(actual).toBe(expected);
	});
});
