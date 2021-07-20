/**
 * Agate styled Header.
 *
 * @example
 * <Header title="Profile" titleAbove="Settings" noLine>
 * 	<Button>Close</Button>
 * </Header>
 *
 * @module agate/Header
 * @exports Header
 * @exports HeaderBase
 * @exports HeaderDecorator
 */

import kind from '@enact/core/kind';
import {Cell, Row, Layout} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {MarqueeController, MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Header.module.less';

const MarqueeH1 = MarqueeDecorator('h1');
const MarqueeH2 = MarqueeDecorator('h2');

/**
 * A header component for a Panel with a `title`, `titleAbove`, `subtitle`
 *
 * @class HeaderBase
 * @memberof agate/Header
 * @ui
 * @public
 */
const HeaderBase = kind({
	name: 'Header',

	propTypes: /** @lends agate/Header.HeaderBase.prototype */ {
		/**
		 * Title of the header.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * Example:
		 * ```
		 *  <Header>
		 *  	<titleAbove>Introducing...</titleAbove>
		 *  	<title>Example Header Title</title>
		 *  	<subtitle>The Adventure Continues</subtitle>
		 *  </Header>
		 * ```
		 *
		 * @required
		 * @type {String}
		 */
		title: PropTypes.string.isRequired,

		/**
		 * Sets the hint string read.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `header` - The root class name
		 * * `titleContainer` - The background title container
		 * * `subtitle` - Applied to `subtitle`
		 * * `title` - Applied to `title`
		 * * `titleAbove` - Applied to `titleAbove`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Hides the horizontal-rule (line) under the component
		 *
		 * @type {Boolean}
		 * @public
		 */
		hideLine: PropTypes.bool,

		/**
		 * Determines what triggers the marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['hover', 'render']),

		/**
		 * Text displayed below the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		subtitle: PropTypes.string,

		/**
		 * Text displayed above the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		titleAbove: PropTypes.string
	},

	defaultProps: {
		marqueeOn: 'render'
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: true
	},

	computed: {
		'aria-label': ({'aria-label': ariaLabel, title, subtitle}) => {
			return ariaLabel || subtitle ?
				title + ' ' + subtitle :
				title;
		},
		className: ({hideLine, styler}) => styler.append({hideLine, standard: true}),
		subtitleComponent: ({css, marqueeOn, subtitle}) => {
			return (subtitle != null && subtitle !== '') ? <MarqueeH2 className={css.subtitle} marqueeOn={marqueeOn}>{subtitle}</MarqueeH2> : null;
		},
		titleAboveComponent: ({css, marqueeOn, titleAbove}) => {
			return (titleAbove != null && titleAbove !== '') ? <MarqueeH2 className={css.titleAbove} marqueeOn={marqueeOn}>{titleAbove}</MarqueeH2> : null;
		}
	},

	render: ({children, css, marqueeOn, title, titleAboveComponent, subtitleComponent, ...rest}) => {
		delete rest.hideLine;
		delete rest.subtitle;
		delete rest.titleAbove;

		return (
			<Row component="header" {...rest}>
				<Cell className={css.titleContainer}>
					{titleAboveComponent}
					<MarqueeH1 className={css.title} marqueeOn={marqueeOn}>{title}</MarqueeH1>
					{subtitleComponent}
				</Cell>
				{children ? <Layout className={css.endSlot}>{children}</Layout> : null}
			</Row>
		);
	}
});

/**
 * Applies Agate specific behaviors to [Header]{@link agate/Header.Header} components.
 *
 * @hoc
 * @memberof agate/Header
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const HeaderDecorator = compose(
	Slottable({slots: ['subtitle', 'title', 'titleAbove']}),
	MarqueeController,
	Skinnable
);

/**
 * An Agate-style header component
 *
 * @class Header
 * @memberof agate/Header
 * @extends agate/Header.HeaderBase
 * @mixes agate/Header.HeaderDecorator
 * @ui
 * @public
 */
const Header = HeaderDecorator(HeaderBase);

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {
	Header,
	HeaderBase,
	HeaderDecorator
};
