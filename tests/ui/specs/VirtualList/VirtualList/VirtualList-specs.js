const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitUntilFocused} = require('../VirtualList-utils');

describe('VirtualList', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should meet initial conditions', function () {
		Page.delay(1000);
		expect(Page.buttonHideScrollbar.isFocused()).to.be.true();
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', function () {
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

		it('should position Scrollbar Track on right side in LTR', function () {
			expect(Page.getListRect().right < Page.getVerticalScrollbarRect().right).to.be.true();
		});

		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Page Down', function () {
			// set dataSize to 30
			Page.inputfieldNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(3);
			Page.numPad(0);
			Page.backKey();
			Page.spotlightDown();
			// Move focus to the first item ('Item 00').
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			// Verify Spotlight displays on the first item.
			expectFocusedItem(0, 'focus Item 0');
			// Verify Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
			// Press Page Down.
			Page.pageDown();
			// Verify Spotlight hides.
			expectNoFocusedItem();
			waitUntilFocused(4, 'focus Item 4');
			// Press Page Down.
			Page.pageDown();
			// Verify Spotlight hides.
			expectNoFocusedItem();
			waitUntilFocused(8, 'focus Item 8');
			// 5-way Down several times to scroll down the list.
			Page.fiveWayToItem(20);
			// 5-way Spot the last item.
			Page.fiveWayToItem(29);
			// Verify Spotlight displays on the last item.
			waitUntilFocused(29, 'focus last Item');
			Page.delay(1000);
			// Verify Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Down').to.be.equal('1');
			// 5-way Spot the first item.
			Page.pageUp();
			waitUntilFocused(25, 'focus Item 23');
			Page.pageUp();
			waitUntilFocused(21, 'focus Item 21');
			Page.pageUp();
			waitUntilFocused(17, 'focus Item 17');
			Page.pageUp();
			waitUntilFocused(13, 'focus Item 13');
			Page.pageUp();
			waitUntilFocused(9, 'focus Item 9');
			Page.pageUp();
			waitUntilFocused(5, 'focus Item 5');
			Page.pageUp();
			// Verify Spotlight displays on the first item.
			waitUntilFocused(0, 'focus Item 0');
			// Verify Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
		});

		it('should Items Animate via 5-way Up and Down on Last Item on the page - vertical', function () {
			let bottomId;
			Page.buttonLeft.moveTo();
			Page.spotlightRight(); // needed to focus Item 00 and get into that container
			// Position the pointer on the last item in a current page.
			bottomId = Page.bottomVisibleItemId();
			Page.item(bottomId).moveTo();
			// Verify Spotlight displays on the item.
			Page.delay(1000); // needed to run on mpc
			expectFocusedItem(Number((Page.bottomVisibleItemId().slice(4))), 'focus bottomId');
			// 5-way Down to the item below the last item on the current page.
			Page.spotlightDown();
			// Verify The list Scrolled Up.  2 The Spotted item is placed on the Bottom.
			Page.delay(1000); // needed to run on mpc
			expectFocusedItem(Number((Page.bottomVisibleItemId().slice(4))), 'focus bottomId');
			// 5-way Up to the previous item.
			Page.spotlightUp();
			// Verify The list *does not* Scroll Down.
			// Check the bottomVisibleItem is still the same as the one before 5-way Up to check the list did not scroll Down
			expect(Number(bottomId.slice(4)) === ((Number((Page.bottomVisibleItemId().slice(4))))) - 1).to.be.true();
			// Verify  The Spotted item is placed above the item on the Bottom.
			expectFocusedItem(Number((bottomId.slice(4))), 'focus bottomId');
			// 5-way Up to the first item ('*Item 000*').
			Page.fiveWayToItem(0);
			// Verify The list Scroll Down  and the spotted item is placed on the Top.
			expectFocusedItem(Number((Page.topVisibleItemId().slice(4))), 'focus Item 00');
			expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		it('shoud navigate between inside and outside of a list', function () {
			// 5-way Down to the 10th item.
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			Page.fiveWayToItem(10);
			// 5-way Spot Item 00.
			Page.fiveWayToItem(0);
			// Verify: Spotlight displays on Item 00.
			expectFocusedItem(0);
			// 5-way Up. Verify Spotlight displays on the Top button.
			Page.spotlightUp();
			expect(Page.buttonTop.isFocused()).to.be.true();
		});

		it('should focus last item when entering from outside after scrolling via 5way', function () {
			// Move focus to the first item ('Item 00').
			Page.buttonLeft.moveTo();
			Page.spotlightRight();

			// 5-way Down to the 21st item ('Item 20').
			Page.fiveWayToItem(20);

			// Position the pointer on 'JumpToItem' button and select
			Page.buttonTop.moveTo();
			Page.spotlightSelect();

			// Move focus to the list
			Page.buttonLeft.moveTo();
			Page.spotlightRight();

			// Verify Spotlight displays on the 21st item ('Item 20');
			expectFocusedItem(20);
		});

		it('should  display childProps', function () {
			// Verify: The first item shows 'Item 00'.
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			expectFocusedItem(0);
			expect(Page.textContent()).to.equal('Item 00');
			// Verify: The second item shows 'Item 01'.
			Page.spotlightDown();
			expectFocusedItem(1);
			expect(Page.textContent()).to.equal('Item 01');
			// 5-way Spot and Select 'Child Props' toggle button.
			Page.buttonChildProps.click();
			// Verify: The first item shows 'Item 000 child props'.
			Page.item(0).moveTo();
			expectFocusedItem(0);
			expect(Page.textContent()).to.equal('Item 00 child props');
			// Verify The second item shows 'Item 001 child props'.
			Page.spotlightDown();
			expectFocusedItem(1);
			expect(Page.textContent()).to.equal('Item 01 child props');
		});

		it('should change spotlight size when item`s size changing', function () {
			// Verify: The default value for the 'itemSize' knob is itemSizeValue.
			const defaultItemSize = Page.getItemSize();
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			const defaultSpotlightSize = Page.spotlightSize();
			expect(defaultSpotlightSize).to.equal(94);
			// Set item size to 150
			Page.inputfieldItemSize.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(1);
			Page.numPad(5);
			Page.numPad(0);
			Page.backKey();
			// Verify item size
			const curItemSize = Page.getItemSize();
			expect(curItemSize.height).to.equal(150);
			expect(curItemSize.width).to.equal(defaultItemSize.width);
			Page.spotlightDown();
			Page.item(2).moveTo();
			expectFocusedItem(2);
			const curSpotlightSize = Page.spotlightSize();
			// spotLight size is ItemSize - 2*border-witdth
			expect(curSpotlightSize).to.equal(144);
			// Set item size to 50
			Page.inputfieldItemSize.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(5);
			Page.numPad(0);
			Page.backKey();
			// Verify item size
			const newItemSize = Page.getItemSize();
			expect(newItemSize.height).to.equal(50);
			expect(newItemSize.width).to.equal(defaultItemSize.width);
			Page.spotlightDown();
			Page.item(3).moveTo();
			expectFocusedItem(3);
			const newSpotlightSize = Page.spotlightSize();
			expect(newSpotlightSize).to.equal(44);
		});


		it('should have 96px padding for the top and bottom of the scrollbarTrack', function () {
			// Verify: The scrollbar size fit to the size of the list.
			expect(Page.getListRect().height).to.equal(Page.getVerticalScrollbarRect().height);
			// There is a button with size=small at the top and bottom
			// Check top
			expect(Page.getVerticalScrollbarTrackRect().top - Page.getVerticalScrollbarRect().top).to.equal(48);
			// Check bottom
			expect(Page.getVerticalScrollbarRect().bottom - Page.getVerticalScrollbarTrackRect().bottom).to.equal(48);
		});
	});
});
