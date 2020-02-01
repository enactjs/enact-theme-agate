const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Gallium Day',
	Page: Page,
	skin: 'gallium-day'
});
