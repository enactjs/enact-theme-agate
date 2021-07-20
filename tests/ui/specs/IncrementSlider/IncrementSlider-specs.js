const Page = require('./IncrementSliderPage');

describe('IncrementSlider', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const incrementSlider = Page.components.incrementSliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal incrementSlider on right arrow key when active', function () {
					Page.delay(1000);
					expect(incrementSlider.decrementButton.isFocused()).to.be.true();
					Page.spotlightRight();
					const originalValue = incrementSlider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of horizontal incrementSlider on left arrow key when active', function () {
					expect(incrementSlider.decrementButton.isFocused()).to.be.true();
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = incrementSlider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal incrementSlider on incrementSlider click at position', function () {
					expect(incrementSlider.decrementButton.isFocused()).to.be.true();
					const originalValue = incrementSlider.knobPositionHorizontal;
					incrementSlider.self.click();
					// expect knob `left` css prop to be bigger than original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue > originalValue).to.be.true();
				});
			});

			describe('buttons click', function () {
				it('should change the value of horizontal incrementSlider on increment/decrement button click', function () {
					const originalValue = incrementSlider.knobPositionHorizontal;
					incrementSlider.incrementButton.click();
					incrementSlider.incrementButton.click();
					// expect knob `left` css prop to be bigger than original one
					const value1 = incrementSlider.knobPositionHorizontal;
					expect(value1 > originalValue).to.be.true();

					incrementSlider.decrementButton.click();
					// expect knob `left` css prop to be less than value1
					const value2 = incrementSlider.knobPositionHorizontal;
					expect(value2 < value1).to.be.true();
				});
			});
		});

		describe('with custom `progressAnchor`', function () {
			const incrementSlider = Page.components.incrementSliderCustomProgressAnchor;

			it('fill bar should be greater than 0 when value is at minimum', function () {
				expect(incrementSlider.incrementSliderFillWidth > 0).to.be.true();
			});
		});

		describe('with tooltip', function () {
			const incrementSlider = Page.components.incrementSliderWithTooltip;

			it('should display a tooltip on focus', function () {
				incrementSlider.focusSlider();
				expect(incrementSlider.tooltip.isExisting()).to.be.true();
			});
		});

		describe('vertical incrementSlider', function () {
			const incrementSlider = Page.components.incrementSliderVertical;

			describe('5-way', function () {
				it('should increment the value of vertical incrementSlider on up arrow key when active', function () {
					incrementSlider.focusSlider();
					const originalValue = incrementSlider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be greater than original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue > originalValue).to.be.true();
				});

				it('should decrement the value of vertical incrementSlider on down arrow key when active', function () {
					incrementSlider.focusSlider();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = incrementSlider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be less than original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue < originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should change the value of vertical incrementSlider on incrementSlider click at position', function () {
					const originalValue = incrementSlider.knobPositionVertical;
					incrementSlider.self.click();
					// expect knob `left` css prop to be greater than original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue > originalValue).to.be.true();
				});
			});
		});

		describe('disabled', function () {
			const incrementSlider = Page.components.incrementSliderDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal incrementSlider on right arrow key when active', function () {
					incrementSlider.focusSlider();
					const originalValue = incrementSlider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of horizontal incrementSlider on left arrow key when active', function () {
					incrementSlider.focusSlider();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = incrementSlider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal incrementSlider on incrementSlider click at position', function () {
					const originalValue = incrementSlider.knobPositionHorizontal;
					incrementSlider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionHorizontal;
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('buttons click', function () {
				it('should not change the value of horizontal incrementSlider on increment/decrement button click', function () {
					const originalValue = incrementSlider.knobPositionHorizontal;
					incrementSlider.incrementButton.click();
					incrementSlider.incrementButton.click();
					// expect knob `left` css prop to be bigger than original one
					const value1 = incrementSlider.knobPositionHorizontal;
					expect(value1).to.equal(originalValue);

					incrementSlider.decrementButton.click();
					// expect knob `left` css prop to be less than value1
					const value2 = incrementSlider.knobPositionHorizontal;
					expect(value2).to.equal(value1);
				});
			});
		});

		describe('vertical disabled incrementSlider', function () {
			const incrementSlider = Page.components.incrementSliderVerticalDisabled;

			describe('5-way', function () {
				it('should not increment the value of vertical incrementSlider on up arrow key when active', function () {
					incrementSlider.focusSlider();
					const originalValue = incrementSlider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});

				it('should not decrement the value of vertical incrementSlider on down arrow key when active', function () {
					incrementSlider.focusSlider();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = incrementSlider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should not change the value of vertical incrementSlider on incrementSlider click at position', function () {
					incrementSlider.focusSlider();
					const originalValue = incrementSlider.knobPositionVertical;
					incrementSlider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = incrementSlider.knobPositionVertical;
					expect(newValue === originalValue).to.be.true();
				});
			});
		});
	});
});
