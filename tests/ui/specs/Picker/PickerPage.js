'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class PickerInterface {
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

	get picker () {
		return element('.internal_DrumPicker_DrumPicker_drumPicker', this.self);
	}

	decrementer (picker) {
		return element('.internal_DrumPicker_DrumPicker_itemDecrement', picker);
	}

	incrementer (picker) {
		return element('.internal_DrumPicker_DrumPicker_itemIncrement', picker);
	}

	selectedItem (picker) {
		return element('.internal_DrumPicker_DrumPicker_selectedItem', picker);
	}
}

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new PickerInterface('pickerDefault');
		const pickerDisabled = new PickerInterface('pickerDisabled');
		const pickerWithDefaultValue = new PickerInterface('pickerWithDefaultValue');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue};
	}

	open (urlExtra) {
		super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
