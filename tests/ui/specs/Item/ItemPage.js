'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class ItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	hover () {
		return $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}
}

class ItemPage extends Page {
	constructor () {
		super();
		this.title = 'Item Test';
		const item1 = new ItemInterface('item1');
		const item2Disabled = new ItemInterface('item2Disabled');
		const item3WithLabel = new ItemInterface('item3WithLabel');
		const item4Inline = new ItemInterface('item4Inline');
		const item5InlineDisabled = new ItemInterface('item5InlineDisabled');
		const item6Inline = new ItemInterface('item6Inline');
		const item7Inline = new ItemInterface('item7Inline');
		const item8Inline = new ItemInterface('item8Inline');
		this.components = {item1, item2Disabled, item3WithLabel, item4Inline, item5InlineDisabled, item6Inline, item7Inline, item8Inline};
	}

	open (urlExtra) {
		super.open('Item-View', urlExtra);
		this.delay(500);
	}
}

module.exports = new ItemPage();
