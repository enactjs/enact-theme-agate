'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class RangePickerInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`.${this.className}>div`));
	}

	get self () {
		return $(this.selector);
	}

	get rangePicker () {
		return element('.internal_DrumPicker_DrumPicker_drumPicker', this.self);
	}

	decrementer (rangePicker) {
		return element('.internal_DrumPicker_DrumPicker_itemDecrement', rangePicker);
	}

	incrementer (rangePicker) {
		return element('.internal_DrumPicker_DrumPicker_itemIncrement', rangePicker);
	}

	selectedItem (rangePicker) {
		return element('.internal_DrumPicker_DrumPicker_selectedItem', rangePicker);
	}
}

class RangePickerPage extends Page {
	constructor () {
		super();
		this.title = 'RangePicker Test';
		const rangePickerDefault = new RangePickerInterface('rangePickerDefault');
		const rangePickerDisabled = new RangePickerInterface('rangePickerDisabled');
		const rangePickerWithNegativeValues = new RangePickerInterface('rangePickerWithNegativeValues');
		this.components = {rangePickerDefault, rangePickerDisabled, rangePickerWithNegativeValues};
	}

	open (urlExtra) {
		super.open('RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();
