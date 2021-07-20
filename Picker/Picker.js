/**
 * A component for selecting values from a list of values.
 *
 * @example
 * <Picker>
 * 	{['A', 'B', 'C']}
 * </Picker>
 *
 * @module agate/Picker
 * @exports Picker
 * @exports PickerBase
 */

import kind from '@enact/core/kind';
import {mapAndFilterChildren} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import {Children} from 'react';

import PickerCore, {DrumPickerItem} from '../internal/DrumPicker';

/**
 * The base `Picker` component.
 *
 * This version is not [`spottable`]{@link spotlight/Spottable.Spottable}.
 *
 * @class PickerBase
 * @memberof agate/Picker
 * @ui
 * @public
 */
const PickerBase = kind({
	name: 'Picker',

	propTypes: /** @lends agate/Picker.PickerBase.prototype */ {
		/**
		 * Picker value list.
		 *
		 * @type {Array}
		 * @required
		 * @public
		 */
		children: PropTypes.array.isRequired,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Sets the hint string read when focusing the decrement button.
		 *
		 * @default 'previous item'
		 * @type {String}
		 * @public
		 */
		decrementAriaLabel: PropTypes.string,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Sets the hint string read when focusing the increment button.
		 *
		 * @default 'next item'
		 * @type {String}
		 * @public
		 */
		incrementAriaLabel: PropTypes.string,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the `value` changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Orientation of the picker.
		 *
		 * Controls whether the buttons are arranged horizontally or vertically around the value.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number,

		/**
		 * Allows picker to continue from the start of the list after it reaches the end and
		 * vice-versa.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	defaultProps: {
		orientation: 'vertical',
		value: 0
	},

	computed: {
		children: ({children, value}) => {
			// send to internal/DrumPicker only 5 children. Current selected +/-2
			const childrenArray = children.filter((child, index) => index >= value - 2 && index <= value + 2);
			return (mapAndFilterChildren(childrenArray, (child) => (
				<DrumPickerItem key={value}>{child}</DrumPickerItem>
			)));
		},
		disabled: ({children, disabled}) => Children.count(children) > 1 ? disabled : true,
		max: ({children}) => children && children.length ? children.length - 1 : 0,
		value: ({value, children}) => {
			const max = children && children.length ? children.length - 1 : 0;
			return clamp(0, max, value);
		}
	},

	render: (props) => {
		const {children, max, value, ...rest} = props;

		return (
			<PickerCore
				{...rest}
				index={value}
				min={0}
				max={max}
				value={value}
			>
				{children}
			</PickerCore>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PickerBase]{@link agate/Picker.PickerBase} components.
 *
 * @hoc
 * @memberof agate/Picker
 * @mixes ui/Changeable.Changeable
 * @public
 */
const PickerDecorator = compose(
	Pure,
	Changeable
);

/**
 * A Picker component that allows selecting values from a list of values.
 *
 * By default, `Picker` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class Picker
 * @memberof agate/Picker
 * @extends agate/Picker.PickerBase
 * @ui
 * @public
 */
const Picker = PickerDecorator(PickerBase);

/**
 * Default index of the selected child.
 *
 * *Note*: Changing `defaultValue` after initial render has no effect.
 *
 * @name defaultValue
 * @memberof agate/Picker.Picker.prototype
 * @type {Number}
 * @public
 */

export default Picker;
export {
	Picker,
	PickerBase
};
