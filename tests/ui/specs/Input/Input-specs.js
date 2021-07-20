const Page = require('./InputPage');

describe('Input', function () {

	it('should have focus on first input at start', function () {
		Page.open();
		Page.delay(1000);
		expect(Page.input1.isFocused()).to.be.true();
	});

	it('should focus input element on enter', function () {
		Page.open();
		Page.spotlightSelect();
		expect(Page.input1.$('input').isFocused()).to.be.true();
	});

	it('should focus input 2 on 5-way right', function () {
		Page.open();
		Page.spotlightRight();
		expect(Page.input2.isFocused()).to.be.true();
	});

	it('should focus input 3 on 5-way down', function () {
		Page.open();
		Page.spotlightDown();
		expect(Page.input3.isFocused()).to.be.true();
	});

	it('should focus input 4 on 5-way down and 5-way right', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightRight();
		expect(Page.input4.isFocused()).to.be.true();
	});

	it('should focus small input on 5-way down and 5-way right', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightRight();
		expect(Page.smallInput.isFocused()).to.be.true();
	});

	describe('input with clearButton', function () {
		it('should focus input with clear button on 5-way down', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expect(Page.inputWithClearButton.isFocused()).to.be.true();
		});

		it('should have a clearButton', function () {
			Page.open();
			expect(Page.inputWithClearButtonElement).to.be.true();
		});

		it('should have `cancel` icon by default', function () {
			Page.open();
			expect(Page.inputWithClearButtonIconValue).to.equal(983097); // decimal converted charCode of Unicode 'cancel' character
		});
	});

	describe('input with custom clearButton', function () {
		it('should focus input with custom clear button on 5-way right and 5-way down', function () {
			Page.open();
			Page.spotlightRight();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expect(Page.inputWithCustomClearButton.isFocused()).to.be.true();
		});

		it('should have a custom clearButton', function () {
			Page.open();
			expect(Page.inputWithCustomClearButtonElement).to.be.true();
		});

		it('should have a `closex` icon when providing a custom icon', function () {
			Page.open();
			expect(Page.inputWithCustomClearButtonIconValue).to.equal(983029); // decimal converted charCode of Unicode 'closex' character
		});
	});

	it('should have text-align to "right" when in ar-SA locale', function () {
		Page.open('?locale=ar-SA');
		expect(Page.inputElement1.getCSSProperty('text-align').value).to.equal('right');
	});

	describe('disabled', function () {
		it('should be spottable', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			expect(Page.disabledInput.isFocused()).to.be.true();
		});
	});
});
