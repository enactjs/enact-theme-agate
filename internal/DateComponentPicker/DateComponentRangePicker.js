import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';

import {RangePickerBase} from '../../RangePicker';

import componentCss from './DateComponentPicker.module.less';

/**
 * {@link agate/internal/DataComponentPicker.DateComponentRangePicker} allows the selection of
 * one part of the date or time using a {@link agate/RangePicker.RangePicker}.
 *
 * @class DateComponentRangePickerBase
 * @memberof agate/internal/DateComponentPicker
 * @ui
 * @private
 */
const DateComponentRangePickerBase = kind({
	name: 'DateComponentRangePicker',

	propTypes:  /** @lends agate/internal/DateComponentPicker.DateComponentRangePickerBase.prototype */ {
		/**
		 * The maximum value for the date component
		 *
		 * @type {Number}
		 * @required
		 */
		max: PropTypes.number.isRequired,

		/**
		 * The minimum value for the date component
		 *
		 * @type {Number}
		 * @required
		 */
		min: PropTypes.number.isRequired,

		/**
		 * The value of the date component
		 *
		 * @type {Number}
		 * @required
		 */
		value: PropTypes.number.isRequired,

		/**
		 * Sets the hint string read when focusing the picker.
		 *
		 * @type {String}
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * The label to display below the picker
		 *
		 * @type {String}
		 */
		label: PropTypes.string,

		/*
		 * When `true`, allow the picker to continue from the opposite end of the list of options.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'dateComponentPicker'
	},

	render: ({accessibilityHint, className, max, min, value, wrap, ...rest}) => (
		<RangePickerBase
			{...rest}
			accessibilityHint={(accessibilityHint == null) ? value : accessibilityHint}
			className={className}
			max={max}
			min={min}
			orientation="vertical"
			value={value}
			wrap={wrap}
		/>
	)
});

/**
 * {@link agate/internal/DateComponentPicker.DateComponentRangePicker} allows the selection of one
 * part of the date (date, month, or year). It is a stateful component but allows updates by
 * providing a new `value` via props.
 *
 * @class DateComponentRangePicker
 * @memberof agate/internal/DateComponentPicker
 * @mixes ui/Changeable.Changeable
 * @ui
 * @private
 */
const DateComponentRangePicker = Changeable(
	DateComponentRangePickerBase
);

export default DateComponentRangePicker;
export {
	DateComponentRangePicker,
	DateComponentRangePickerBase
};
