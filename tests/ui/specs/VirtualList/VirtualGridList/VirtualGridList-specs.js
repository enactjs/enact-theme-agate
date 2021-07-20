const Page = require('./VirtualGridListPage'),
	{expectFocusedItem, waitUntilFocused, waitUntilVisible, expectNoFocusedItem} = require('../VirtualList-utils');

describe('VirtualGridList', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should meet initial conditions', function () {
		Page.delay(1000);
		expect(Page.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', function () {
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(0);
		});
	});
});

describe('Focus after calling scrollTo()', function () {
	beforeEach(function () {
		Page.open('ScrollTo');
	});

	it('should focus after calling scrollTo()', function () {
		// wait for view open.
		waitUntilFocused(0);
		// Press Page Down a few times until 'Click me' item  is visible.
		Page.checkScrollbyPagekey('down');
		Page.checkScrollbyPagekey('down');
		Page.checkScrollbyPagekey('down');
		// Set to pointer mode.
		// Hover the 'Click me' item.
		Page.showPointerByKeycode();
		Page.item(20).moveTo();
		// Click 'Click me' item.
		browser.positionClick();
		Page.delay(500);
		// Verify: list is scrolled to first item.
		expect(Page.topLeftVisibleItemId()).to.equal('item0');
		// Verify: There is no spotlight on any item.
		expectNoFocusedItem();
		// Press 5-way Left.
		// Verify: Set to 5-way mode.
		Page.hidePointerByKeycode();
		Page.spotlightLeft();
		// Verify: Spotlight on item0.
		expectFocusedItem(0);
		// Press 5-way down 5 times.
		for (let i = 1; i < 6; i++) {
			Page.spotlightDown();
			waitUntilFocused(i * 4);
			waitUntilVisible(i * 4);
		}
		Page.delay(500);
		// Press 5-way OK.
		Page.spotlightSelect();
		// Verify: list is scrolled to first item.
		expect(Page.topLeftVisibleItemId()).to.equal('item0');
		// Verify: Spotlight on item0.
		expectFocusedItem(0);
	});
});
