let Page = require('./DrawerPage'),
	{validateTitle, expectClosed, expectNoneScrimOpen, expectOpen} = require('./Drawer-utils.js');

describe('Drawer', function () {

	const drawerCommon = Page.drawerCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		Page.delay(1000);
		expect(drawerCommon.buttonDrawer1.isFocused()).to.be.true();
	});

	it('should not have the drawer on start', function () {
		expectClosed(drawerCommon);
	});

	describe('with no line', function () {

		const drawer = Page.components.drawer1;

		it('should have correct heading', function () {
			drawerCommon.buttonDrawer1.click();

			Page.waitForOpen(drawer);

			expectOpen(drawerCommon);
			validateTitle(drawer, 'Drawer with no line');
		});

		it('should not have a line under the heading text', function () {
			drawerCommon.buttonDrawer1.click();

			Page.waitForOpen(drawer);

			expectOpen(drawerCommon);
			expect(drawer.hasLine).to.not.be.true();
		});

		describe('using 5-way', function () {

			it('should open drawer', function () {
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);
				expect(drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				Page.spotlightRight();
				Page.spotlightSelect();

				Page.waitForClose(drawer);
				expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {
			it('should open the drawer with scrim on click', function () {
				drawerCommon.buttonDrawer1.click();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', function () {
				drawerCommon.buttonDrawer1.click();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				drawer.buttonCancel.click();
				Page.waitForClose(drawer);

				expectClosed(drawerCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const drawer = Page.components.drawer2;

		it('should have correct heading', function () {
			drawerCommon.buttonDrawer2.click();
			browser.pause(100); // needed to pass instead of waitTransitionEnd
			expectOpen(drawerCommon);
			validateTitle(drawer, 'Drawer without animation');
		});

		describe('using 5-way', function () {

			it('should open drawer', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(drawerCommon);
				expect(drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				Page.spotlightRight();
				Page.spotlightSelect();

				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer with scrim on click', function () {
				drawerCommon.buttonDrawer2.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', function () {
				drawerCommon.buttonDrawer2.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectOpen(drawerCommon);

				drawer.buttonCancel.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd

				expectClosed(drawerCommon);
			});
		});
	});

	describe('with scrimType - transparent', function () {

		const drawer = Page.components.drawer3;

		it('should have correct heading', function () {
			drawerCommon.buttonDrawer3.click();
			Page.waitForOpen(drawer);

			expectOpen(drawerCommon);
			validateTitle(drawer, 'Drawer with transparent scrim');
		});

		describe('using 5-way', function () {

			it('should open drawer', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);
				expect(drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				Page.spotlightRight();
				Page.spotlightSelect();

				Page.waitForClose(drawer);
				expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer with scrim on click', function () {
				drawerCommon.buttonDrawer3.click();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);
			});

			it('should close the drawer and scrim on cancel click in drawer container', function () {
				drawerCommon.buttonDrawer3.click();
				Page.waitForOpen(drawer);

				expectOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				drawer.buttonCancel.click();
				Page.waitForClose(drawer);

				expectClosed(drawerCommon);
			});
		});
	});

	describe('with scrimType - none', function () {

		const drawer = Page.components.drawer4;

		it('should have correct heading', function () {
			drawerCommon.buttonDrawer4.click();
			Page.waitForOpen(drawer);

			expectNoneScrimOpen(drawerCommon);
			validateTitle(drawer, 'Drawer without scrim');
		});

		describe('using 5-way', function () {

			it('should open drawer', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectNoneScrimOpen(drawerCommon);
				expect(drawer.isOpen).to.be.true();
			});

			it('should close drawer with cancel button on 5-way right in drawer container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(drawer);

				expectNoneScrimOpen(drawerCommon);

				// Add delay for Jenkins fail that cancel button is clicked before drawer is fully opened.
				Page.delay(300);
				Page.spotlightRight();
				Page.spotlightSelect();

				Page.waitForClose(drawer);
				expectClosed(drawerCommon);
			});
		});

		describe('using pointer', function () {

			it('should open the drawer without scrim on click', function () {
				drawerCommon.buttonDrawer4.click();

				expectNoneScrimOpen(drawerCommon);
			});

			it('should close the popup on click in drawer container', function () {
				drawerCommon.buttonDrawer4.click();
				Page.waitForOpen(drawer);

				expectNoneScrimOpen(drawerCommon);

				browser.pause(100);
				drawer.buttonOK.click();
				Page.waitForClose(drawer);

				expectClosed(drawerCommon);
			});

			it('should close the drawer on cancel click in drawer container', function () {
				drawerCommon.buttonDrawer4.click();
				Page.waitForOpen(drawer);

				expectNoneScrimOpen(drawerCommon);

				browser.pause(100);
				drawer.buttonCancel.click();
				Page.waitForClose(drawer);

				expectClosed(drawerCommon);
			});
		});
	});
});
