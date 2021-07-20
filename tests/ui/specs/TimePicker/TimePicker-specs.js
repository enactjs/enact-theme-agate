const Page = require('./TimePickerPage');
const {extractValues} = require('./TimePicker-utils.js');

describe('TimePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefault;

			it('should have hour-minute-meridiem order', function () {
				browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
				Page.spotlightRight();
				browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
				Page.spotlightRight();
				browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
			});

			describe('5-way', function () {
				it('should decrease the hour when decrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					Page.spotlightUp();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the hour when incrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					Page.spotlightDown();
					browser.pause(500);
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightUp();
					browser.pause(500);
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					browser.pause(500);
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should not change displayed hour when changing the meridiem picker', function () {
					const {hour, meridiem} = extractValues(timePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  interval: 100});
					if (meridiem === 'AM') {
						Page.spotlightDown();
					} else {
						Page.spotlightUp();
					}
					browser.pause(500);
					const {hour: value} = extractValues(timePicker);
					expect(value).to.equal(hour);
				});

				it('should change the meridiem on hour boundaries', function () {
					const {meridiem} = extractValues(timePicker);
					Page.spotlightDown();
					browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
					if (meridiem === 'AM') {
						for (let i = 12; i; i -= 1) {
							// 12 hours ought to change the value text if meridiem changes
							Page.spotlightDown();
						}
					} else {
						for (let i = 12; i; i -= 1) {
							// 12 hours ought to change the value text if meridiem changes
							Page.spotlightUp();
						}
					}

					const {meridiem: value} = extractValues(timePicker);
					expect(value !== meridiem).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should select hour when opened', function () {
					timePicker.decrementer(timePicker.hour).click();
					browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
				});


				it('should increase the hour when incrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					timePicker.incrementer(timePicker.hour).click();
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					timePicker.decrementer(timePicker.hour).click();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					timePicker.incrementer(timePicker.minute).click();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					timePicker.decrementer(timePicker.minute).click();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should change the meridiem on hour boundaries', function () {
					const {meridiem} = extractValues(timePicker);
					if (meridiem === 'AM') {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							timePicker.incrementer(timePicker.hour).click();
						}
					} else {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							timePicker.decrementer(timePicker.hour).click();
						}
					}

					const {meridiem: value} = extractValues(timePicker);
					expect(value !== meridiem).to.be.true();
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update when incrementing the picker', function () {
					timePicker.focus();
					Page.spotlightDown();
					Page.spotlightRight();
					Page.spotlightDown();

					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});

				it('should not update when decrementing the picker', function () {
					timePicker.focus();
					Page.spotlightDown();
					Page.spotlightRight();
					Page.spotlightUp();

					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					Page.spotlightSelect();
					timePicker.focus();
				});
			});

			describe('pointer', function () {
				it('should not update hour on click', function () {
					const {hour} = extractValues(timePicker);
					timePicker.decrementer(timePicker.hour).click();
					expect(timePicker.hour.isFocused()).to.be.true();
					browser.pause(500);
					const {hour: value} = extractValues(timePicker);
					expect(value).to.equal(hour);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;

			it('should not update \'defaultValue\' on decrementing disabled picker', function () {
				const {hour, minute, meridiem} = extractValues(timePicker);
				timePicker.focus();
				Page.spotlightUp();
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				Page.spotlightUp();

				browser.pause(500);

				expect(hour).to.equal(12);
				expect(minute).to.equal(0);
				expect(meridiem).to.equal('AM');
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', function () {
				const {hour, minute, meridiem} = extractValues(timePicker);
				timePicker.focus();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightDown();

				browser.pause(500);

				expect(hour).to.equal(12);
				expect(minute).to.equal(0);
				expect(meridiem).to.equal('AM');
			});

		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have minute-hour-meridiem order', function () {
			timePicker.focus();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(timePicker.minute.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.hour.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.meridiem.isFocused()).to.be.true();
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(function () {
			Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', function () {
			expect(timePicker.meridiem.isExisting(), 'meridiem exists').to.be.false();
		});

		it('should display hours in 24-hour format', function () {
			expect(extractValues(timePicker).hour).to.equal(0); // midnight hour
		});

		it('should increment hours from 23 to 0', function () {
			Page.spotlightRight();
			Page.spotlightRight();
			// go to 23 first
			Page.spotlightUp();
			browser.pause(1000);
			expect(extractValues(timePicker).hour).to.equal(23);
			// now increment
			Page.spotlightDown();
			browser.pause(1000);
			expect(extractValues(timePicker).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', function () {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightUp();
			browser.pause(1000);
			expect(extractValues(timePicker).hour).to.equal(23);
		});
	});
});
