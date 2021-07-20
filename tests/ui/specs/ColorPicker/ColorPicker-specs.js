const Page = require('./ColorPickerPage');

describe('ColorPicker', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('focus management', function () {
		it('should focus the `#colorPickerDefault` when page loads', function () {
			Page.delay(1000);
			expect(Page.components.colorPickerDefault.button.isFocused()).to.be.true();
		});
	});

	describe('default', function () {
		const colorPickerDefault = Page.components.colorPickerDefault;

		it('should have correct value', function () {
			expect(colorPickerDefault.colorSwatch).to.equal('#FF7FAE');
		});
	});

	describe('5-way', function () {
		it('should have correct color code after changing selected value', function () {
			const colorPickerDefault = Page.components.colorPickerDefault;

			expect(colorPickerDefault.button.isFocused()).to.be.true();
			expect(colorPickerDefault.colorSwatch).to.equal('#FF7FAE');

			Page.spotlightSelect();
			Page.delay(1000);
			Page.spotlightRight();
			Page.spotlightSelect();
			browser.pause(100);

			expect(colorPickerDefault.colorSwatch).to.equal('#8333E9');
		});

		it('should not open the `#colorPickerDisabled` when 5-way down and select', function () {
			const colorPickerDisabled = Page.components.colorPickerDisabled;

			expect(Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.spotlightSelect();
			expect(colorPickerDisabled.isOpen).to.not.be.true();
		});

		it('should focus the `#colorPickerDirectionUp` when 5-way down, then down', function () {
			const colorPickerDirectionUp = Page.components.colorPickerDirectionUp;

			expect(Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.spotlightDown();
			expect(colorPickerDirectionUp.button.isFocused()).to.be.true();
		});

		it('should focus the first color item in `#colorPickerOpen` option list when 5-way right', function () {
			const colorPickerOpen = Page.components.colorPickerOpen;

			expect(Page.components.colorPickerDefault.button.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightSelect();
			Page.spotlightRight();

			expect(colorPickerOpen.item(1).isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should open colorPicker on click and select a new color', function () {
			const colorPicker = Page.components.colorPickerDefault;
			const oldColor = colorPicker.colorSwatch;

			// Open the first colorPicker and wait for the first color list item to be focused
			colorPicker.button.click();
			Page.delay(1000);

			// Click on first button in palette
			colorPicker.item(1).click();
			Page.delay(1000);

			// Verify the selected color
			const newColor = colorPicker.colorSwatch;
			expect(oldColor !== newColor).to.be.true();
		});

		it('should dismiss colorPicker when clicking outside', function () {
			const colorPicker = Page.components.colorPickerDefault;

			// Open the first colorPicker and wait for the first color list item to be focused
			Page.spotlightSelect();
			Page.delay(1000);
			Page.spotlightRight();

			// Click in the area outside the ColorPicker (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});

			Page.delay(1000);

			// Verify that the floating list no longer exists (ColorPicker is closed)
			expect(colorPicker.isOpen).to.not.be.true();
		});
	});
});
