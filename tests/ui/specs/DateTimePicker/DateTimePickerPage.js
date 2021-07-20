'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class DateTimePickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get self () {
		return element(`#${this.id}`, browser);
	}

	get day () {
		return element('.DatePicker_DatePicker_day', this.self);
	}

	get month () {
		return element('.DatePicker_DatePicker_month', this.self);
	}

	get year () {
		return element('.DatePicker_DatePicker_year', this.self);
	}

	get hour () {
		return element('.TimePicker_TimePicker_hourPicker', this.self);
	}
	get meridiem () {
		return element('.TimePicker_TimePicker_meridiemPicker', this.self);
	}
	get minute () {
		return element('.TimePicker_TimePicker_minutePicker', this.self);
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

class DateTimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DateTimePicker Test';
		this.components = {};
		this.components.dateTimePickerDefault = new DateTimePickerInterface('dateTimePickerDefault');
		this.components.dateTimePickerWithDefaultValue = new DateTimePickerInterface('dateTimePickerWithDefaultValue');
		this.components.dateTimePickerDisabled = new DateTimePickerInterface('dateTimePickerDisabled');
		this.components.dateTimePickerDisabledWithDefaultValue = new DateTimePickerInterface('dateTimePickerDisabledWithDefaultValue');
	}

	open (urlExtra) {
		super.open('DateTimePicker-View', urlExtra);
	}
}

module.exports = new DateTimePickerPage();
