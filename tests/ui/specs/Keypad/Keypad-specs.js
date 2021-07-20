const Page = require('./KeypadPage');

describe('Keypad', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		const keypad = Page.components.keypadDefault;

		it('should have focus on first button at start', function () {
			Page.delay(1000);
			expect(keypad.button(1).isFocused()).to.be.true();
		});

		it('can navigate down/left/right/up between keys', function () {
			expect(keypad.button(1).isFocused()).to.be.true();
			Page.spotlightDown();
			expect(keypad.button(4).isFocused()).to.be.true();
			Page.spotlightRight();
			expect(keypad.button(5).isFocused()).to.be.true();
			Page.spotlightUp();
			expect(keypad.button(2).isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(keypad.button(1).isFocused()).to.be.true();
		});
	});

	describe('5-way disabled', function () {
		const keypad = Page.components.keypadDisabled;

		it('buttons are focusable when navigating down/left/right/up', function () {
			keypad.focus();
			expect(keypad.button(1).isFocused()).to.be.true();
			Page.spotlightDown();
			expect(keypad.button(4).isFocused()).to.be.true();
			Page.spotlightRight();
			expect(keypad.button(5).isFocused()).to.be.true();
			Page.spotlightUp();
			expect(keypad.button(2).isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(keypad.button(1).isFocused()).to.be.true();
		});
	});

	describe('5-way Spotlight disabled', function () {
		const keypad = Page.components.keypadSpotlightDisabled;

		it('buttons are not focusable when navigating down/left/right/up', function () {
			keypad.focus();
			expect(keypad.button(1).isFocused()).to.not.be.true();
			Page.spotlightDown();
			expect(keypad.button(4).isFocused()).to.not.be.true();
			Page.spotlightRight();
			expect(keypad.button(5).isFocused()).to.not.be.true();
			Page.spotlightUp();
			expect(keypad.button(2).isFocused()).to.not.be.true();
			Page.spotlightLeft();
			expect(keypad.button(1).isFocused()).to.not.be.true();
		});
	});
});
