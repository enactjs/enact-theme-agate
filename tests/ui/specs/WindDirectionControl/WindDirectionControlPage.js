'use strict';
const {getText, Page} = require('@enact/ui-test-utils/utils');

class WindDirectionControlInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	coloredPath (index) {
		return $(this.selector + ' .ArcPicker_ArcPicker_arc:nth-child(' + index + ') path:first-child');
	}

	clickablePath (index) {
		return $(this.selector + ' .ArcPicker_ArcPicker_arc:nth-child(' + index + ') path:nth-child(2)');
	}

	iconValue () {
		return  getText($(this.selector + ' .ArcPicker_ArcPicker_valueDisplay>div')).codePointAt();
	}
}

class WindDirectionControlPage extends Page {
	constructor () {
		super();
		this.title = 'WindDirectionControl Test';
		const windDirectionControlDefault = new WindDirectionControlInterface('windDirectionControl1');
		const winDirectionControlAirRight = new WindDirectionControlInterface('windDirectionControl2');
		const windDirectionControlAirUp = new WindDirectionControlInterface('windDirectionControl3');
		const windDirectionControlDisabled = new WindDirectionControlInterface('windDirectionControl4');

		this.components = {
			windDirectionControlDefault,
			winDirectionControlAirRight,
			windDirectionControlAirUp,
			windDirectionControlDisabled
		};
	}

	open (urlExtra) {
		super.open('WindDirectionControl-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new WindDirectionControlPage();
