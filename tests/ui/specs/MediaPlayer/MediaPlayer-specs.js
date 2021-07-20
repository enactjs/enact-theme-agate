const Page = require('./MediaPlayerPage');

describe('MediaPlayer', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		mediaPlayerDefault,
		mediaPlayerDisabled,
		mediaPlayerSpotlightDisabled,
		mediaPlayerTiny
	} = Page.components;

	describe('default', function () {
		it('should have the slider knob focused', function () {
			Page.delay(1000);
			expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
		});

		it('should play media on playButton click', function () {
			expect(mediaPlayerDefault.knob.getCSSProperty('left').value).to.equal('0px');

			mediaPlayerDefault.playButton.click();
			Page.waitForPlayMedia(mediaPlayerDefault);

			expect(mediaPlayerDefault.knob.getCSSProperty('left').value).to.not.equal('0px');
		});

		it('should play next media on nextButton click', function () {
			expect(mediaPlayerDefault.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerDefault.nextButton.click();
			Page.waitForPlayMedia(mediaPlayerDefault);

			expect(mediaPlayerDefault.source).to.equal('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		it('should repeat current media on nextButton click when repeatButton is active', function () {
			expect(mediaPlayerDefault.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerDefault.repeatButton.click();
			// Check if "repeat one" is active
			expect(mediaPlayerDefault.repeatStatus).to.equal('1');

			mediaPlayerDefault.nextButton.click();
			Page.waitForPlayMedia(mediaPlayerDefault);

			expect(mediaPlayerDefault.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();

				Page.spotlightDown();

				expect(mediaPlayerDefault.playButton.isFocused()).to.be.true();
			});

			it('should focus `previous` button on 5-way down, then left', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();

				expect(mediaPlayerDefault.previousButton.isFocused()).to.be.true();
			});

			it('should focus back `play` button when navigating back to media controls ', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();
				expect(mediaPlayerDefault.previousButton.isFocused()).to.be.true();
				Page.spotlightLeft();
				expect(mediaPlayerDefault.shuffleButton.isFocused()).to.be.true();
				Page.spotlightLeft();
				expect(mediaPlayerDefault.repeatButton.isFocused()).to.be.true();
				Page.spotlightUp();
				Page.spotlightDown();

				expect(mediaPlayerDefault.playButton.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', function () {
				mediaPlayerDefault.hover('Next');

				expect(mediaPlayerDefault.nextButton.isFocused()).to.be.true();
			});

			it('should focus `menu` button on hover', function () {
				mediaPlayerDefault.hover('Menu');

				expect(mediaPlayerDefault.menuButton.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		it('should have the slider knob focused', function () {
			expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
			Page.spotlightRight();

			expect(mediaPlayerDisabled.slider.isFocused()).to.be.true();
		});

		it('should not play media on playButton click', function () {
			expect(mediaPlayerDisabled.knob.getCSSProperty('left').value).to.equal('0px');

			mediaPlayerDisabled.playButton.click();
			Page.delay(1000);

			expect(mediaPlayerDisabled.knob.getCSSProperty('left').value).to.equal('0px');
		});

		it('should not play next media on nextButton click', function () {
			expect(mediaPlayerDisabled.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerDisabled.nextButton.click();
			Page.delay(1000);

			expect(mediaPlayerDisabled.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
				Page.spotlightRight();

				expect(mediaPlayerDisabled.slider.isFocused()).to.be.true();

				Page.spotlightDown();

				expect(mediaPlayerDisabled.playButton.isFocused()).to.be.true();
			});

			it('should focus `previous` button on 5-way down, then left', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
				Page.spotlightRight();

				expect(mediaPlayerDisabled.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();

				expect(mediaPlayerDisabled.previousButton.isFocused()).to.be.true();
			});

			it('should focus back `play` button when navigating back to media controls ', function () {
				expect(mediaPlayerDefault.slider.isFocused()).to.be.true();
				Page.spotlightRight();

				expect(mediaPlayerDisabled.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();
				expect(mediaPlayerDisabled.previousButton.isFocused()).to.be.true();
				Page.spotlightLeft();
				expect(mediaPlayerDisabled.shuffleButton.isFocused()).to.be.true();
				Page.spotlightLeft();
				expect(mediaPlayerDisabled.repeatButton.isFocused()).to.be.true();
				Page.spotlightUp();
				Page.spotlightDown();

				expect(mediaPlayerDisabled.playButton.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', function () {
				mediaPlayerDisabled.hover('Next');

				expect(mediaPlayerDisabled.nextButton.isFocused()).to.be.true();
			});

			it('should focus `menu` button on hover', function () {
				mediaPlayerDisabled.hover('Menu');

				expect(mediaPlayerDisabled.menuButton.isFocused()).to.be.true();
			});
		});
	});

	describe('spotlightDisabled', function () {

		it('should not have the slider knob focused', function () {
			expect(mediaPlayerSpotlightDisabled.slider.isFocused()).to.not.be.true();
		});

		it('should play next media on nextButton click', function () {
			expect(mediaPlayerSpotlightDisabled.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerSpotlightDisabled.nextButton.click();
			Page.waitForPlayMedia(mediaPlayerSpotlightDisabled);

			expect(mediaPlayerSpotlightDisabled.source).to.equal('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		describe('5-way', function () {
			it('should not focus `play` button on 5-way down', function () {
				expect(mediaPlayerSpotlightDisabled.slider.isFocused()).to.not.be.true();

				Page.spotlightDown();

				expect(mediaPlayerSpotlightDisabled.playButton.isFocused()).to.not.be.true();
			});
		});

		describe('using pointer', function () {
			it('should not focus `next` button on hover', function () {
				mediaPlayerSpotlightDisabled.hover('Next');

				expect(mediaPlayerSpotlightDisabled.nextButton.isFocused()).to.not.be.true();
			});

			it('should not focus `menu` button on hover', function () {
				mediaPlayerSpotlightDisabled.hover('Menu');

				expect(mediaPlayerSpotlightDisabled.menuButton.isFocused()).to.not.be.true();
			});
		});
	});

	describe('tiny', function () {
		it('should play media on playButton click', function () {
			mediaPlayerTiny.focus();
			expect(mediaPlayerTiny.knob.getCSSProperty('left').value).to.equal('0px');

			Page.spotlightDown();

			mediaPlayerTiny.playButton.click();
			Page.waitForPlayMedia(mediaPlayerTiny);

			expect(mediaPlayerTiny.knob.getCSSProperty('left').value).to.not.equal('0px');
		});

		it('should play next media on nextButton click', function () {
			mediaPlayerTiny.focus();
			expect(mediaPlayerTiny.source).to.equal('https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3');

			mediaPlayerTiny.nextButton.click();
			Page.waitForPlayMedia(mediaPlayerTiny);

			expect(mediaPlayerTiny.source).to.equal('https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3');
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way down', function () {
				mediaPlayerTiny.focus();
				expect(mediaPlayerTiny.slider.isFocused()).to.be.true();

				Page.spotlightDown();

				expect(mediaPlayerTiny.playButton.isFocused()).to.be.true();
			});

			it('should focus `previous` button on 5-way down, then left', function () {
				mediaPlayerTiny.focus();
				expect(mediaPlayerTiny.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();

				expect(mediaPlayerTiny.previousButton.isFocused()).to.be.true();
			});

			it('should focus back `play` button when navigating back to media controls ', function () {
				mediaPlayerTiny.focus();
				expect(mediaPlayerTiny.slider.isFocused()).to.be.true();

				Page.spotlightDown();
				Page.spotlightLeft();
				expect(mediaPlayerTiny.previousButton.isFocused()).to.be.true();
				Page.spotlightUp();
				Page.spotlightDown();

				expect(mediaPlayerTiny.playButton.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should focus `next` button on hover', function () {
				mediaPlayerTiny.hover('Next');

				expect(mediaPlayerTiny.nextButton.isFocused()).to.be.true();
			});
		});
	});
});
