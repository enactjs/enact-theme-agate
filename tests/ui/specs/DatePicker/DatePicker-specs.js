const Page = require('./DatePickerPage');
const {daysInMonth, extractValues} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefault;

			it('should have month-day-year order', function () {
				Page.spotlightDown();
				expect(datePicker.month.isFocused(), 'Month').to.be.true();
				Page.spotlightRight();
				expect(datePicker.day.isFocused(), 'Day').to.be.true();
				Page.spotlightRight();
				expect(datePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				it('should increase the month when incrementing the picker', function () {
					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightDown();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightUp();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.spotlightDown();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.spotlightUp();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.spotlightDown();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.spotlightUp();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});

			describe('pointer', function () {
				it('should increase the month when incrementing the picker', function () {
					const {month} = extractValues(datePicker);
					datePicker.incrementer(datePicker.month).click();
					expect(datePicker.month.isFocused()).to.be.true();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(datePicker);
					datePicker.decrementer(datePicker.month).click();
					expect(datePicker.month.isFocused()).to.be.true();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					datePicker.incrementer(datePicker.day).click();
					expect(datePicker.day.isFocused()).to.be.true();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					datePicker.decrementer(datePicker.day).click();
					expect(datePicker.day.isFocused()).to.be.true();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(datePicker);
					datePicker.incrementer(datePicker.year).click();
					expect(datePicker.year.isFocused()).to.be.true();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(datePicker);
					datePicker.decrementer(datePicker.year).click();
					expect(datePicker.year.isFocused()).to.be.true();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2020, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update when incrementing the picker', function () {
					datePicker.focus();
					Page.spotlightRight();
					Page.spotlightDown();

					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2020);
				});

				it('should not update when decrementing the picker', function () {
					datePicker.focus();
					Page.spotlightRight();
					Page.spotlightUp();

					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2020);
				});
			});
		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', function () {
				datePicker.month.click();
				expect(datePicker.month.isFocused()).to.be.true();
			});

			it('should not increase the day when incrementing disabled picker', function () {
				datePicker.focus();
				Page.spotlightDown();
				browser.pause(500);
				const {day: value} = extractValues(datePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', function () {
				datePicker.focus();
				Page.spotlightUp();
				browser.pause(500);
				const {day: value} = extractValues(datePicker);
				expect(value).to.equal(1);
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', function () {
				const {day, month, year} = extractValues(datePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2020);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', function () {
				const {day, month, year} = extractValues(datePicker);
				datePicker.focus();
				Page.spotlightUp();
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				Page.spotlightUp();

				browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', function () {
				const {day, month, year} = extractValues(datePicker);
				datePicker.focus();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightDown();

				browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2020);
			});
		});
	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have day-month-year order', function () {
			datePicker.focus();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(datePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.isFocused()).to.be.true();
		});
	});
});
