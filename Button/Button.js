/**
 * Agate styled button components and behaviors.
 *
 * @example
 * <Button>Hello Enact!</Button>
 *
 * @module agate/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {cap} from '@enact/core/util';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children, Fragment} from 'react';
import warning from 'warning';

import Icon from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './Button.module.less';

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link agate/Button.Button}.
 *
 * @class ButtonBase
 * @memberof agate/Button
 * @extends ui/Button.ButtonBase
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends agate/Button.ButtonBase.prototype */ {
		/**
		 * Animate when this component renders.
		 *
		 * @type {Boolean}
		 * @public
		 */
		animateOnRender: PropTypes.bool,

		/**
		 * The delay before the button is animated, in milliseconds.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		animationDelay: PropTypes.number,

		/**
		 * The background opacity of this button.
		 *
		 * Valid values are:
		 * * `'opaque'`,
		 * * `'lightOpaque'`, and
		 * * `'transparent'`
		 *
		 * @type {('opaque'|'lightOpaque'|'transparent')}
		 * @default 'opaque'
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['opaque', 'lightOpaque', 'transparent']),

		/**
		 * A small message overlaid onto the button.
		 *
		 * @type {Number|String}
		 * @public
		 */
		badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

		/**
		 * A custom color for the badge element.
		 *
		 * This prop is only visible if the `badge` prop is also set.
		 *
		 * @type {String}
		 * @public
		 */
		badgeColor: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root class name
		 * * `bg` - The background node of the button
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a button specifying a `size` of `'small'`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Additional DOM nodes which may be necessary for decorating the Button.
		 *
		 * @type {Node}
		 * @private
		 */
		decoration: PropTypes.node,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.  This property only has an effect when
		 * `backgroundOpacity` is "opaque".
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * The component used to render the icon.
		 *
		 * @type {Component|Node}
		 * @default Icon
		 * @private
		 */
		iconComponent: EnactPropTypes.componentOverride,

		/**
		 * True if button is an icon only button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		iconOnly: PropTypes.bool,

		/**
		 * Specifies on which side (`'before'` or `'after'`) of the text the icon appears.
		 *
		 * @type {('before'|'after')}
		 * @default 'before'
		 * @public
		 */
		iconPosition: PropTypes.oneOf(['before', 'after']),

		/**
		 * The position of this button in relation to other buttons.
		 *
		 * To create a collection of buttons that appear as one entity: buttons that butt up against
		 * each other. Specify where the button is in the arrangement: 'left', 'center', or 'right'.
		 * This prop is not recommended for use on a lonely button with no other buttons nearby.
		 * Not specifying this optional prop leaves the button behaving normally.
		 *
		 * @type {('left'|'center'|'right')}
		 * @public
		 */
		joinedPosition: PropTypes.oneOf(['left', 'center', 'right']),

		/**
		 * Boolean controlling whether this component should enforce the "minimum width" rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * @type {('smallest'|'small'|'large'|'huge')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['smallest', 'small', 'large', 'huge']),

		/**
		 * The amount of sprite "cells" in the src image of the `icon` being supplied. This prop has no effect without `icon`.
		 *
		 * @type {Number}
		 * @public
		 */
		spriteCount: PropTypes.number,

		/**
		 * The button type.
		 *
		 * Grid buttons are intended to be grouped with other related buttons.
		 *
		 * @type {('grid'|'standard')}
		 * @default 'standard'
		 * @public
		 */
		type: PropTypes.oneOf(['grid', 'standard'])
	},

	defaultProps: {
		animationDelay: 0,
		backgroundOpacity: 'opaque',
		iconComponent: Icon,
		iconOnly: false,
		iconPosition: 'before',
		size: 'large',
		type: 'standard'
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({animateOnRender, backgroundOpacity, highlighted, iconOnly, iconPosition, joinedPosition, selected, type, size, styler}) => styler.append(
			{iconOnly},
			backgroundOpacity,
			size,
			type,
			// iconBefore/iconAfter only applies when using text and an icon
			!iconOnly && `icon${cap(iconPosition)}`,
			(joinedPosition && 'joined' + cap(joinedPosition)),  // If `joinedPosition` is present, prepend the word "joined" to the variable, so the classes are clearer.
			{
				animateOnRender,
				highlighted,
				selected
			}
		),
		checkPropsIncompatibility: ({highlighted, iconOnly, joinedPosition, selected, type}) => {
			warning(!(highlighted && selected), '"highlighted" prop cannot be used at the same time with "selected" prop.');
			warning(!(iconOnly && joinedPosition && type), '"iconOnly" prop cannot be used at the same time with "joinedPosition" and "type" props.');
			warning(!(joinedPosition && type === 'grid'), '"joinedPosition" and "type" (with "grid" value) props cannot be used at the same time.');
		},
		decoration: ({badge, css, decoration}) => {
			if (!badge) return decoration;
			return (
				<Fragment>
					<div className={css.badge}>{badge}</div>
					{decoration}
				</Fragment>
			);
		},
		iconComponent: ({iconComponent, spriteCount}) => {
			// Don't burden basic HTML elements with the spriteCount prop (or other Icon-specific props)
			if (typeof iconComponent === 'string') return iconComponent;

			return (
				<ComponentOverride
					component={iconComponent}
					spriteCount={spriteCount}
				/>
			);
		},
		style: ({animationDelay, badgeColor, style}) => ({
			...style,
			'--agate-button-animation-delay': animationDelay,
			'--agate-button-badge-bg-color': badgeColor
		}),
		minWidth: ({iconOnly, minWidth}) => ((minWidth != null) ? minWidth : !iconOnly)
	},

	render: ({css, ...rest}) => {
		delete rest.animateOnRender;
		delete rest.animationDelay;
		delete rest.backgroundOpacity;
		delete rest.badge;
		delete rest.badgeColor;
		delete rest.checkPropsIncompatibility;
		delete rest.highlighted;
		delete rest.iconOnly;
		delete rest.iconPosition;
		delete rest.joinedPosition;
		delete rest.selected;
		delete rest.spriteCount;
		delete rest.type;

		return UiButtonBase.inline({
			...rest,
			css
		});
	}
});

/**
 * A higher-order component that determines if it is a button that only displays an icon.
 *
 * @class IconButtonDecorator
 * @memberof agate/Button
 * @hoc
 * @private
 */
const IconButtonDecorator = hoc((config, Wrapped) => {
	return kind({
		name: 'IconButtonDecorator',

		computed: {
			iconOnly: ({children}) => (Children.toArray(children).filter(Boolean).length === 0)
		},

		render: (props) => {
			return (
				<Wrapped {...props} />
			);
		}
	});
});

/**
 * Applies Agate specific behaviors to [ButtonBase]{@link agate/Button.ButtonBase} components.
 *
 * @hoc
 * @memberof agate/Button
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ButtonDecorator = compose(
	Pure,
	IconButtonDecorator,
	MarqueeDecorator({className: componentCss.marquee}),
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A button component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <Button
 *   backgroundOpacity="transparent"
 * >
 *   Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof agate/Button
 * @extends agate/Button.ButtonBase
 * @mixes agate/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
