const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const rangePicker = Page.components.rangePickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', function () {
					expect(rangePicker.self.isFocused()).to.be.true();
					Page.spotlightDown();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(10);
				});

				it('should change the value backward when decrementing the rangePicker', function () {
					expect(rangePicker.self.isFocused()).to.be.true();
					Page.spotlightUp();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', function () {
					rangePicker.incrementer(rangePicker.self).click();
					expect(rangePicker.self.isFocused()).to.be.true();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(10);
				});

				it('should decrease the value when decrementing the rangePicker', function () {
					rangePicker.decrementer(rangePicker.self).click();
					expect(rangePicker.self.isFocused()).to.be.true();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});
			});
		});

		describe('disabled', function () {
			const rangePicker = Page.components.rangePickerDisabled;

			describe('5-way', function () {
				it('should not change the value forward when incrementing the rangePicker', function () {
					const oldValue = extractValue(rangePicker);
					Page.spotlightLeft();
					Page.spotlightDown();
					rangePicker.focus();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not change the value backward when decrementing the rangePicker', function () {
					const oldValue = extractValue(rangePicker);
					Page.spotlightLeft();
					Page.spotlightUp();
					rangePicker.focus();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', function () {
					const oldValue = extractValue(rangePicker);
					rangePicker.incrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', function () {
					const oldValue = extractValue(rangePicker);
					rangePicker.decrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});

		describe('with \'negativeValues\'', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValues;

			it('should have the default value selected', function () {
				const newValue = extractValue(rangePicker);
				expect(newValue).to.equal(0);
			});

			it('should decrement to negative number', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				expect(rangePicker.self.isFocused()).to.be.true();
				Page.spotlightUp();
				browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(newValue).to.equal(-1);
			});
		});
	});
});
