import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
import Button from '../Button';

/**
 * An {@link agate/ApplicationCloseButton.ApplicationCloseButton} with `closex` icon. It is used in
 * {@link agate/Panels.Panels} positioned at the top right corner.
 * `onApplicationClose` callback function should be specified to close your app. The recommended
 * action to take with the event is `window.close()`, but you may also want to also do operations
 * like save user work or close database connections.
 *
 * @class ApplicationCloseButton
 * @memberof agate/Panels
 * @ui
 * @private
 */
const ApplicationCloseButton = kind({
	name: 'ApplicationCloseButton',

	propTypes: /** @lends agate/Panels.ApplicationCloseButton.prototype */ {
		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @memberof agate/Panels.ApplicationCloseButton.prototype
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * A function to run when app close button is clicked
		 *
		 * @type {Function}
		 */
		onApplicationClose: PropTypes.func
	},

	computed: {
		'aria-label': ({'aria-label': ariaLabel}) => ariaLabel == null ? $L('Exit app') : ariaLabel
	},

	render: ({onApplicationClose, ...rest}) => {
		return (
			<Button
				{...rest}
				onClick={onApplicationClose}
				size="small"
				icon="closex"
			/>
		);
	}
});

export default ApplicationCloseButton;
export {
	ApplicationCloseButton
};
