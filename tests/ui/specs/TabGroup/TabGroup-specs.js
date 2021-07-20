const Page = require('./TabGroupPage');

describe('TabGroup', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const tabGroup = Page.components.tabGroupDefault;

		describe('first tab', function () {
			it('should have focus on first tab on start', function () {
				Page.delay(1000);
				expect(tabGroup.focusableTabs(1).isFocused()).to.be.true();
			});

			it('should display `home` icon', function () {
				expect(tabGroup.iconValue(1)).to.equal(983231); // decimal converted charCode of Unicode 'home' character
			});
		});

		describe('second tab', function () {
			it('should be focused with 5-way Right', function () {
				tabGroup.focusTab(1);
				Page.spotlightRight();

				expect(tabGroup.focusableTabs(2).isFocused()).to.be.true();
			});

			it('should display `setting` icon', function () {
				expect(tabGroup.iconValue(2)).to.equal(983083); // decimal converted charCode of Unicode 'setting' character
			});
		});

		describe('third tab', function () {
			it('should be focused with 5-way Right', function () {
				tabGroup.focusTab(2);
				Page.spotlightRight();

				expect(tabGroup.focusableTabs(3).isFocused()).to.be.true();
			});

			it('should display `display` icon', function () {
				expect(tabGroup.iconValue(3)).to.equal(983244); // decimal converted charCode of Unicode 'display' character
			});
		});
	});

	describe('TabGroup slot before/after', function () {
		const tabGroup = Page.components.tabGroupSlotBeforeAfter;

		it('should have previous button', function () {
			expect(tabGroup.previousButton).to.be.true();
		});

		it('should have next button', function () {
			expect(tabGroup.nextButton).to.be.true();
		});
	});

	describe('TabGroup tabPosition after', function () {
		const tabGroup = Page.components.tabGroupTabAfter;

		it('should position icon after title', function () {
			expect(tabGroup.tabAfter).to.be.true();
		});
	});

	describe('TabGroup vertical', function () {
		const tabGroup = Page.components.tabGroupVertical;

		it('should align TagGroup vertically', function () {
			expect(tabGroup.verticalOrientation).to.be.true();
		});

		it('should focus the second item with 5-way Down', function () {
			tabGroup.focusTab(1);
			Page.spotlightDown();
			expect(tabGroup.focusableTabs(2).isFocused()).to.be.true();
		});

		it('should focus the third item with 5-way Down', function () {
			tabGroup.focusTab(2);
			Page.spotlightDown();

			expect(tabGroup.focusableTabs(3).isFocused()).to.be.true();
		});

		it('should focus the first item with 5-way Up', function () {
			tabGroup.focusTab(2);
			Page.spotlightUp();

			expect(tabGroup.focusableTabs(1).isFocused()).to.be.true();
		});
	});
});
