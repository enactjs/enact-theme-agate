let Page = require('./PopupMenuPage'),
	{validateTitle, expectClosed, expectOpen} = require('./PopupMenu-utils.js');

describe('PopupMenu', function () {

	const popupMenuCommon = Page.popupMenuCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		Page.delay(1000);
		expect(popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
	});

	it('should not have the popupMenu on start', function () {
		expectClosed(popupMenuCommon);
	});

	describe('with AutoDismiss', function () {

		const popupMenu = Page.components.popupMenu1;

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				Page.spotlightRight();

				Page.waitForFocused(popupMenu.buttonCancel);
				expect(popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
				Page.waitForFocused(popupMenu.buttonOK);

				Page.spotlightSelect();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu1.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu1.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('without AutoDismiss', function () {

		const popupMenu = Page.components.popupMenu2;

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should not dismiss the popupMenu on escape key', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)

				expectOpen(popupMenuCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should not dismiss the popupMenu and should not move spotlight from the popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)

				expectOpen(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu2.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with no Component', function () {
		const popupMenu = Page.components.popupMenu3;

		describe('using 5-way', function () {

			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu3.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu3.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', function () {
				popupMenuCommon.buttonPopupMenu3.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const popupMenu = Page.components.popupMenu4;

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way down and right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.spotlightRight();
				Page.waitForFocused(popupMenu.buttonCancel);
				expect(popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu4.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(popupMenuCommon);
			});
		});
	});


	describe('with Close Button', function () {

		const popupMenu = Page.components.popupMenu5;

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonClose);
				expect(popupMenu.buttonClose.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should dismiss the popupMenu on 5-way select close button', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonClose);
				Page.spotlightSelect();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu5.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu5.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on close button click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu5.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonClose.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

		});
	});

	describe('with Title', function () {

		const popupMenu = Page.components.popupMenu6;

		it('should have correct title', function () {
			popupMenuCommon.buttonPopupMenu6.click();
			Page.waitForOpen(popupMenu);

			expectOpen(popupMenuCommon);
			validateTitle(popupMenu, 'PopupMenu title');
		});

		describe('using 5-way', function () {
			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				expect(popupMenu.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.waitForFocused(popupMenu.buttonOK);
				Page.spotlightRight();

				Page.waitForFocused(popupMenu.buttonCancel);
				expect(popupMenu.buttonCancel.isFocused()).to.be.true();
			});

			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu6.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonOK.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on cancel click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu6.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonCancel.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('with close button label', function () {

		const popupMenu = Page.components.popupMenu7;

		it('should have correct closeButtonLabel', function () {
			popupMenuCommon.buttonPopupMenu7.click();
			Page.waitForOpen(popupMenu);

			expectOpen(popupMenuCommon);
			expect(popupMenu.label).to.equal('Click me!');
		});

		describe('using 5-way', function () {
			it('should dismiss the popupMenu on escape key', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should spot back the popupMenu button on auto dismiss the popupMenu', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
				expect(popupMenuCommon.buttonPopupMenu7.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open the popupMenu with scrim on click', function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);
			});

			it('should dismiss the popupMenu on escape key', function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				Page.backKey();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});

			it('should close the popupMenu and scrim on close button click in popupMenu container', function () {
				popupMenuCommon.buttonPopupMenu7.click();
				Page.waitForOpen(popupMenu);

				expectOpen(popupMenuCommon);

				popupMenu.buttonClose.click();
				Page.waitForClose(popupMenu);

				expectClosed(popupMenuCommon);
			});
		});
	});

	describe('toggling open', function () {

		it('should allow spotlight navigation', function () {
			popupMenuCommon.buttonPopupMenu8.click();

			Page.delay(1000);

			expect(popupMenuCommon.buttonPopupMenu8.isFocused()).to.be.true();
		});
	});
});
