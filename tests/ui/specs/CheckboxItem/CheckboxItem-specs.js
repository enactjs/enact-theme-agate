const Page = require('./CheckboxItemPage');
const {expectChecked, expectUnchecked, expectInline} = require('./CheckboxItem-utils');
const {expectOrdering} = require('@enact/ui-test-utils/utils');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxItemDefault;

			it('should have focus on first item at start', function () {
				Page.delay(1000);
				expect(checkboxItem.self.isFocused()).to.be.true();
			});

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item');
			});

			it('should not be checked', function () {
				expectUnchecked(checkboxItem);
			});

			it('should have the icon to the left of text', function () {
				expectOrdering(checkboxItem.checkboxIcon, checkboxItem.value);
			});

			describe('5-way', function () {
				it('should check the item when selected', function () {
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when selected twice', function () {
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should display icon `check` when selected', function () {
					Page.spotlightSelect();
					expect(checkboxItem.checkboxIconSymbol).to.equal('✓');
				});

				it('should move focus down on 5-way down', function () {
					Page.spotlightDown();
					expect(Page.components.checkboxItemDefaultSelected.self.isFocused()).to.be.true();
				});

				it('should move focus up on 5-way up', function () {
					Page.components.checkboxItemDefaultSelected.focus();
					Page.spotlightUp();
					expect(checkboxItem.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should check the item when clicked', function () {
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should display the `check` icon when clicked', function () {
					checkboxItem.self.click();
					expect(checkboxItem.checkboxIconSymbol).to.equal('✓');
				});
			});
		});

		describe('selected', function () {
			const checkboxItem = Page.components.checkboxItemDefaultSelected;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item selected');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display correct icon', function () {
				expect(checkboxItem.checkboxIconSymbol).to.equal('✓');
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});

		describe('indeterminate', function () {
			const checkboxItem = Page.components.checkboxItemIndeterminate;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item indeterminate');
			});

			it('should be indeterminate state', function () {
				expect(checkboxItem.isIndeterminate).to.be.true();
			});

			it('should dislay an indeterminate icon', function () {
				expect(checkboxItem.indeterminateIconSymbol).to.equal('-');
			});
		});

		describe('slotBefore', function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item slotBefore');
			});

			it('should have a node(icon) to the right of checkbox icon ', function () {
				expectOrdering(checkboxItem.checkboxIcon, checkboxItem.slotBeforeNode);
			});

			it('should have a node(icon) to the left of text', function () {
				expectOrdering(checkboxItem.slotBeforeNode, checkboxItem.value);
			});
		});

		describe('inline', function () {
			const checkboxItem = Page.components.checkboxItemInline;

			it('should have two inlined checkboxes positioned inlined', function () {
				const checkboxItem2 = Page.components.checkboxItemInlineIndeterminate.self;

				expectInline(checkboxItem.self, checkboxItem2);
			});

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item inline');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display item inline', function () {
				expect(checkboxItem.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});

		describe('inline indeterminate', function () {
			const checkboxItem = Page.components.checkboxItemInlineIndeterminate;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item inline indeterminate');
			});

			it('should display item inline', function () {
				expect(checkboxItem.isInline).to.be.true();
			});
		});

		// Note, the disabled test below requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
		describe('disabled', function () {
			const checkboxItem = Page.components.checkboxItemDisabled;
			const prevCheckboxItem = Page.components.checkboxItemInlineIndeterminate;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item disabled');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			describe('5-way', function () {
				it('should be able to focus the item', function () {
					prevCheckboxItem.focus();
					Page.spotlightDown();
					expect(checkboxItem.self.isFocused()).to.be.true();
				});

				it('should not uncheck the item when selected', function () {
					Page.spotlightDown();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should not uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', function () {
			expect(Page.components.checkboxItemDefault.self.isFocused()).to.be.true();
		});

		it('should have checkbox icon to the right of text when default', function () {
			const checkboxItem = Page.components.checkboxItemDefault;
			expectOrdering(checkboxItem.value, checkboxItem.checkboxIcon);
		});

		it('should have a node(icon) to the right of text when default', function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;
			expectOrdering(checkboxItem.value, checkboxItem.slotBeforeNode);
		});

		it('should have checkbox icon to the right of a node(icon)', function () {
			const checkboxItem = Page.components.checkboxItemSlotBefore;
			expectOrdering(checkboxItem.slotBeforeNode, checkboxItem.checkboxIcon);
		});

		it('should have two inline checkboxItems positioned inline', function () {
			const checkboxItem1 = Page.components.checkboxItemInline.self;
			const checkboxItem2 = Page.components.checkboxItemInlineIndeterminate.self;

			expectInline(checkboxItem1, checkboxItem2);
		});
	});
});
