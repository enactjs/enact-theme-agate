/**
 * A Popup menu component.
 *
 * @module agate/PopupMenu
 * @exports PopupMenu
 * @exports PopupMenuBase
 * @exports PopupMenuDecorator
 */

import kind from '@enact/core/kind';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Skinnable from '../Skinnable';
import Heading from '../Heading';
import LabeledIconButton from '../LabeledIconButton';
import Scroller from '../Scroller';

import PopupState from '../Popup/PopupState';

import componentCss from './PopupMenu.module.less';

/**
 * The base popup menu component.
 *
 * @class PopupMenuBase
 * @memberof agate/PopupMenu
 * @ui
 * @public
 */
const PopupMenuBase = kind({
	name: 'PopupMenu',
	propTypes: /** @lends agate/PopupMenu.PopupMenuBase.prototype */ {
		/**
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		closeButton: PropTypes.bool,

		/**
		 * The label for the close button.
		 *
		 * @type {String}
		 * @default 'Cancel'
		 * @public
		 */
		closeButtonLabel: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disable popup menu transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the user has attempted to close the popup menu.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called after the transition to hide the popup menu has finished.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Displays the popup menu.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * The layout orientation of the component
		 *
		 * @type {('horizontal')}
		 * @default 'horizontal'
		 * @private
		 */
		orientation: PropTypes.oneOf(['horizontal']),

		/**
		 * The primary title text of the popup menu.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string
	},

	defaultProps: {
		closeButton: false,
		closeButtonLabel: $L('Cancel'),
		noAnimation: false,
		open: false,
		orientation: 'horizontal'
	},

	styles: {
		css: componentCss,
		className: 'popupMenu'
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation)
	},

	render: ({children, closeButton, closeButtonLabel, css, noAnimation, onClose, onHide, open, orientation, title, ...rest}) => {
		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				className={css.popupTransitionContainer}
				onHide={onHide}
				css={css}
			>
				<Layout orientation="vertical" align="center center" role="alert" {...rest}>
					<Cell className={css.title} shrink>
						<Heading css={css} size="title">{title}</Heading>
					</Cell>
					<Cell shrink className={css.body} align="stretch">
						<Scroller direction={orientation} horizontalScrollbar="hidden" verticalScrollbar="hidden">
							{children}
							{closeButton ? <LabeledIconButton
								inline
								icon="cancel"
								onClick={onClose}
								className={css.closeButton}
								size="huge"
								backgroundOpacity="lightOpaque"
							>{closeButtonLabel}</LabeledIconButton> : null}
						</Scroller>
					</Cell>
				</Layout>
			</Transition>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupMenuBase]{@link agate/PopupMenu.PopupMenuBase}.
 *
 * @hoc
 * @memberof agate/PopupMenu
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PopupMenuDecorator = compose(
	Slottable({slots: ['title']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * A stateful component that renders a popup menu.
 *
 * Usage:
 * ```
 * <PopupMenu open title="Title">
 *   Hello!
 * </PopupMenu>
 * ```
 *
 * @class PopupMenu
 * @memberof agate/PopupMenu
 * @extends agate/PopupMenu.PopupMenuBase
 * @mixes agate/PopupMenu.PopupMenuDecorator
 * @ui
 * @public
 */
const PopupMenu = PopupMenuDecorator(PopupMenuBase);

export default PopupMenu;
export {
	PopupMenu,
	PopupMenuBase,
	PopupMenuDecorator
};
