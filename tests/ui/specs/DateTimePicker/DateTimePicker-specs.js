const Page = require('./DateTimePickerPage');
const {daysInMonth, extractValues} = require('./DateTimePicker-utils.js');

describe('DateTimePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const dateTimePicker = Page.components.dateTimePickerDefault;

			it('should have hour-minute-meridiem-month-day-year order', function () {
				browser.waitUntil(() => dateTimePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
				Page.spotlightRight();
				browser.waitUntil(() => dateTimePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
				Page.spotlightRight();
				browser.waitUntil(() => dateTimePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
				Page.spotlightRight();
				expect(dateTimePicker.month.isFocused(), 'Month').to.be.true();
				Page.spotlightRight();
				expect(dateTimePicker.day.isFocused(), 'Day').to.be.true();
				Page.spotlightRight();
				expect(dateTimePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('pointer', function () {
				it('should increase the hour when incrementing the picker', function () {
					const {hour} = extractValues(dateTimePicker);
					dateTimePicker.incrementer(dateTimePicker.hour).click();
					const {hour: value} = extractValues(dateTimePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					const {hour} = extractValues(dateTimePicker);
					dateTimePicker.decrementer(dateTimePicker.hour).click();
					const {hour: value} = extractValues(dateTimePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					const {minute} = extractValues(dateTimePicker);
					dateTimePicker.incrementer(dateTimePicker.minute).click();
					browser.waitUntil(() => dateTimePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = extractValues(dateTimePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					const {minute} = extractValues(dateTimePicker);
					dateTimePicker.decrementer(dateTimePicker.minute).click();
					browser.waitUntil(() => dateTimePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					const {minute: value} = extractValues(dateTimePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should change the meridiem on hour boundaries', function () {
					const {meridiem} = extractValues(dateTimePicker);
					if (meridiem === 'AM') {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							dateTimePicker.incrementer(dateTimePicker.hour).click();
						}
					} else {
						// 12 hours ought to change the value text if meridiem changes
						for (let i = 12; i; i -= 1) {
							dateTimePicker.decrementer(dateTimePicker.hour).click();
						}
					}

					const {meridiem: value} = extractValues(dateTimePicker);
					expect(value !== meridiem).to.be.true();
				});

				it('should increase the month when incrementing the picker', function () {
					const {month} = extractValues(dateTimePicker);
					dateTimePicker.incrementer(dateTimePicker.month).click();
					expect(dateTimePicker.month.isFocused()).to.be.true();
					const {month: value} = extractValues(dateTimePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(dateTimePicker);
					dateTimePicker.decrementer(dateTimePicker.month).click();
					expect(dateTimePicker.month.isFocused()).to.be.true();
					const {month: value} = extractValues(dateTimePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(dateTimePicker);
					const numDays = daysInMonth({month, year});
					dateTimePicker.incrementer(dateTimePicker.day).click();
					expect(dateTimePicker.day.isFocused()).to.be.true();
					const {day: value} = extractValues(dateTimePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(dateTimePicker);
					const numDays = daysInMonth({month, year});
					dateTimePicker.decrementer(dateTimePicker.day).click();
					expect(dateTimePicker.day.isFocused()).to.be.true();
					const {day: value} = extractValues(dateTimePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(dateTimePicker);
					dateTimePicker.incrementer(dateTimePicker.year).click();
					expect(dateTimePicker.year.isFocused()).to.be.true();
					const {year: value} = extractValues(dateTimePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(dateTimePicker);
					dateTimePicker.decrementer(dateTimePicker.year).click();
					expect(dateTimePicker.year.isFocused()).to.be.true();
					const {year: value} = extractValues(dateTimePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2020, 5, 6, 12, 10)`
			const dateTimePicker = Page.components.dateTimePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					dateTimePicker.focus();
					Page.spotlightDown();

					const {day, hour, minute, meridiem,  month, year} = extractValues(dateTimePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2020);
					expect(hour).to.equal(12);
					expect(minute).to.equal(10);
					expect(meridiem).to.equal('PM');
				});
			});
		});

		describe('disabled', function () {
			const dateTimePicker = Page.components.dateTimePickerDisabled;

			it('should not increase the day when incrementing disabled picker', function () {
				dateTimePicker.day.click();
				expect(dateTimePicker.day.isFocused()).to.be.true();
				Page.spotlightDown();

				browser.pause(500);
				const {day: value} = extractValues(dateTimePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', function () {
				dateTimePicker.day.click();
				expect(dateTimePicker.day.isFocused()).to.be.true();
				Page.spotlightUp();
				browser.pause(500);
				const {day: value} = extractValues(dateTimePicker);
				expect(value).to.equal(1);
			});

			it('should not update hour when decrementing disabled picker', function () {
				const {hour} = extractValues(dateTimePicker);
				dateTimePicker.hour.click();
				expect(dateTimePicker.hour.isFocused()).to.be.true();
				Page.spotlightUp();
				browser.pause(500);
				const {hour: value} = extractValues(dateTimePicker);
				expect(value).to.equal(hour);
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const dateTimePicker = Page.components.dateTimePickerDisabledWithDefaultValue;

			it('should display default date', function () {
				const {day, hour, meridiem, minute, month, year} = extractValues(dateTimePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2020);
				expect(hour).to.equal(12);
				expect(minute).to.equal(10);
				expect(meridiem).to.equal('PM');

			});

			it('should not update \'defaultValue\' on decrement', function () {
				const {day, hour, meridiem, minute, month, year} = extractValues(dateTimePicker);
				dateTimePicker.month.click();
				expect(dateTimePicker.month.isFocused()).to.be.true();
				Page.spotlightUp();

				dateTimePicker.day.click();
				expect(dateTimePicker.day.isFocused()).to.be.true();
				Page.spotlightUp();

				dateTimePicker.year.click();
				expect(dateTimePicker.year.isFocused()).to.be.true();
				Page.spotlightUp();

				dateTimePicker.minute.click();
				expect(dateTimePicker.minute.isFocused()).to.be.true();
				Page.spotlightUp();

				dateTimePicker.hour.click();
				expect(dateTimePicker.hour.isFocused()).to.be.true();
				Page.spotlightUp();

				dateTimePicker.meridiem.click();
				expect(dateTimePicker.meridiem.isFocused()).to.be.true();
				if (meridiem === 'AM') {
					Page.spotlightDown();
				} else {
					Page.spotlightUp();
				}

				browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
				expect(hour).to.equal(12);
				expect(minute).to.equal(10);
				expect(meridiem).to.equal('PM');
			});
		});
	});

	describe('RTL locale', function () {
		const dateTimePicker = Page.components.dateTimePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus hour picker when selected', function () {
			expect(dateTimePicker.hour.isFocused()).to.be.true();
		});

		it('should have minute-hour-meridiem-day-month-year order', function () {
			browser.waitUntil(() => dateTimePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
			Page.spotlightRight();
			browser.waitUntil(() => dateTimePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
			Page.spotlightLeft();
			browser.waitUntil(() => dateTimePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
			Page.spotlightLeft();
			browser.waitUntil(() => dateTimePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
			Page.spotlightLeft();
			expect(dateTimePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(dateTimePicker.month.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(dateTimePicker.year.isFocused()).to.be.true();
		});
	});

	describe('24-hour locale', function () {
		const dateTimePicker = Page.components.dateTimePickerWithDefaultValue;

		beforeEach(function () {
			Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', function () {
			expect(dateTimePicker.meridiem.isExisting(), 'meridiem exists').to.be.false();
		});

		it('should display hours in 24-hour format', function () {
			dateTimePicker.hour.click();
			Page.spotlightDown();
			expect(extractValues(dateTimePicker).hour).to.equal(13);
		});

		it('should increment hours from 23 to 0', function () {
			dateTimePicker.hour.click();
			// go to 23 first
			for (let i = 11; i; i -= 1) {
				Page.spotlightDown();
			}
			browser.pause(1000);
			expect(extractValues(dateTimePicker).hour).to.equal(23);
			// now increment
			Page.spotlightDown();
			expect(extractValues(dateTimePicker).hour).to.equal(0);

		});

		it('should decrement hours from 0 to 23', function () {
			dateTimePicker.hour.click();
			// go to 0 first
			for (let i = 12; i; i -= 1) {
				Page.spotlightUp();
			}
			expect(extractValues(dateTimePicker).hour).to.equal(0);
			Page.spotlightUp();
			expect(extractValues(dateTimePicker).hour).to.equal(23);
		});
	});
});
