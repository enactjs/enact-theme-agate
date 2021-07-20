const Page = require('./ImageItemPage');

describe('ImageItem', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first ImageItem at start', function () {
		Page.delay(1000);
		expect(Page.components.imageItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const imageItem = Page.components.imageItemDefault;

		it('should have correct text', function () {
			expect(imageItem.textContent).to.equal('Image Item caption');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemLongCaption.focus();
				Page.spotlightUp();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('long caption', function () {
		const imageItem = Page.components.imageItemLongCaption;

		it('should wrap caption with Marquee with long caption', function () {
			expect(imageItem.valueText).to.equal('Image Item with longer caption has Marquee applied');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemDefault.focus();
				Page.spotlightDown();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('caption overlay', function () {
		const imageItem = Page.components.imageItemCaptionOverlay;

		it('should display correct text', function () {
			expect(imageItem.textContent).to.equal('Image Item caption overlay');
		});

		it('should display caption overlay', function () {
			expect(imageItem.isOverlay).to.be.true();
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemLongCaption.focus();
				Page.spotlightDown();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const imageItem = Page.components.imageItemDisabled;

		it('should display correct text', function () {
			expect(imageItem.textContent).to.equal('Image Item disabled');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemCaptionOverlay.focus();
				Page.spotlightDown();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});
});
