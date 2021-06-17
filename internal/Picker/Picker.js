/* eslint-disable react/jsx-no-bind */

/**
 * A internal Picker component.
 *
 * @module agate/internal/Picker
 * @exports Picker
 * @exports PickerDecorator
 * @private
 */

import {adaptEvent, forEventProp, forward, handle, oneOf} from '@enact/core/handle';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import Touchable from '@enact/ui/Touchable';
import {SlideLeftArranger, SlideTopArranger, ViewManager} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';

import $L from '../$L';
import {PickerItem} from './Picker';
import Skinnable from '../../Skinnable';

import css from './Picker.module.less';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

const wrapRange = (min, max, value) => {
	if (value > max) {
		return min + (value - max - 1);
	} else if (value < min) {
		return max - (min - value - 1);
	} else {
		return value;
	}
};

const handleChange = direction => handle(
	adaptEvent(
		(ev, {min, max, step, value, wrap}) => ({
			value: wrap ? wrapRange(min, max, value + (direction * step)) :  clamp(min, max, value + (direction * step)),
			reverseTransition: direction < 0
		}),
		forward('onChange')
	)
);

const increment = handleChange(1);
const decrement = handleChange(-1);

/**
 * The base component for {@link agate/internal/Picker.Picker}.
 *
 * @class Picker
 * @memberof agate/internal/Picker
 * @ui
 * @private
 */
const PickerBase = kind({
	name: 'Picker',

	propTypes: /** @lends agate/internal/Picker.Picker.prototype */ {
		/**
		 * Index for internal ViewManager
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		index: PropTypes.number.isRequired,

		/**
		 * The maximum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/Picker.Picker.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		max: PropTypes.number.isRequired,

		/**
		 * The minimum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/Picker.Picker.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		min: PropTypes.number.isRequired,

		/**
		 * Accessibility hint
		 *
		 * For example, `hour`, `year`, and `meridiem`
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * The "aria-label" for the picker.
		 *
		 * By default, `aria-valuetext` is set to the current value.
		 * This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String|Number}
		 * @public
		 */
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

		/**
		 * Children from which to pick
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Class name for component.
		 *
		 * @type {String}
		 * @public
		 */
		className: PropTypes.string,

		/**
		 * Customize component style
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Sets the hint string read when focusing the decrement button.
		 *
		 * @type {String}
		 * @default 'previous item'
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
		 * The picker id reference for setting aria-controls.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the increment button.
		 *
		 * @default 'next item'
		 * @type {String}
		 * @public
		 */
		incrementAriaLabel: PropTypes.string,

		/**
		 * By default, the picker will animate transitions between items if it has a defined
		 * `width`. Specifying `noAnimation` will prevent any transition animation for the
		 * component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * A function to run when the control should increment or decrement.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * A function to run when the picker is removed while retaining focus.
		 *
		 * @type {Function}
		 * @private
		 */
		onSpotlightDisappear: PropTypes.func,

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
		 * When it's `true` it changes the direction of the transition animation.
		 *
		 * @type {Boolean}
		 * @public
		 */
		reverseTransition: PropTypes.bool,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,

		/**
		 * When `true`, the component cannot be navigated using spotlight.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * Allow the picker to only increment or decrement by a given value.
		 *
		 * A step of `2` would cause a picker to increment from 10 to 12 to 14, etc. It must evenly
		 * divide into the range designated by `min` and `max`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The type of picker. It determines the aria-label for the next and previous buttons.
		 *
		 * Depending on the `type`, `decrementAriaLabel`, and `incrementAriaLabel`,
		 * the screen readers read out differently when Spotlight is on the next button, the previous button,
		 * or the picker itself.
		 *
		 * For example, if Spotlight is on the next button
		 * and aria label props(`decrementAriaLabel` and `incrementAriaLabel`) are not defined,
		 * then the screen readers read out as follows.
		 *	`'string'` type: `'next item'`
		 * 	`'number'` type: `'increase the value'`
		 *
		 * @type {('number'|'string')}
		 * @default 'string'
		 * @public
		 */
		type: PropTypes.oneOf(['number', 'string']),

		/**
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number,

		/**
		 * Choose a specific size for your picker. `'small'`, `'medium'`, `'large'`, or set to `null` to
		 * assume auto-sizing. `'small'` is good for numeric pickers, `'medium'` for single or short
		 * word pickers, `'large'` for maximum-sized pickers.
		 *
		 * You may also supply a number. This number will determine the minimum size of the Picker.
		 * Setting a number to less than the number of characters in your longest value may produce
		 * unexpected results.
		 *
		 * @type {('small'|'medium'|'large'|Number)}
		 * @public
		 */
		width: PropTypes.oneOfType([
			PropTypes.oneOf([null, 'small', 'medium', 'large']),
			PropTypes.number
		]),

		/**
		 * Should the picker stop incrementing when the picker reaches the last element? Set `wrap`
		 * to `true` to allow the picker to continue from the opposite end of the list of options.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	defaultProps: {
		accessibilityHint: '',
		orientation: 'vertical',
		step: 1,
		type: 'string',
		value: 0
	},

	styles: {
		css,
		className: 'picker',
		publicClassNames: true
	},

	handlers: {
		handleDecrement: decrement,
		handleFlick: handle(
			forEventProp('direction', 'vertical'),
			// ignore "slow" flicks by filtering out velocity below a threshold
			oneOf(
				[({velocityY}) => velocityY < 0, increment],
				[({velocityY}) => velocityY > 0, decrement]
			)
		),
		handleIncrement: increment
	},

	computed: {
		activeClassName: ({styler}) => styler.join('active', 'item'),
		'aria-label': ({'aria-label': ariaLabel, 'aria-valuetext': valueText}) => {
			if (ariaLabel != null) {
				return ariaLabel;
			}

			return valueText;
		},
		className: ({orientation, styler}) => styler.append(orientation),
		currentItemIndex: ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index);
				} else return index;
			} else return 0;
		},
		currentValueText: ({accessibilityHint, 'aria-valuetext': ariaValueText, children, value}) => {
			if (ariaValueText != null) {
				return ariaValueText;
			}

			let valueText = value;

			if (children && Array.isArray(children)) {
				if (children[value] && children[value].props) {
					valueText = children[value].props.children;
				} else {
					valueText = children[value];
				}
			}

			if (accessibilityHint) {
				valueText = `${valueText} ${accessibilityHint}`;
			}

			return valueText;
		},
		decrementAriaLabel: ({decrementAriaLabel, type}) => {
			if (decrementAriaLabel != null) {
				return decrementAriaLabel;
			}

			if (type === 'number') {
				return `${$L('decrease the value')}`;
			} else {
				return `${$L('previous item')}`;
			}
		},
		decrementItemIndex: ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index - 1);
				} else return index - 1;
			} else return 0;
		},
		focusBackgroundClassName: ({styler}) => styler.join('focusBackground'),
		incrementAriaLabel: ({incrementAriaLabel, type}) => {
			if (incrementAriaLabel != null) {
				return incrementAriaLabel;
			}

			if (type === 'number') {
				return `${$L('increase the value')}`;
			} else {
				return `${$L('next item')}`;
			}
		},
		incrementItemIndex: ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index + 1);
				} else return index + 1;
			} else return 0;
		},
		secondaryDecrementItemIndex: ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index - 2);
				} else return index - 2;
			} else return 0;
		},
		secondaryIncrementItemIndex: ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index + 2);
				} else return index + 2;
			} else return 0;
		},
		valueId: ({id}) => `${id}_value`
	},

	render: (props) => {
		const {
			activeClassName,
			'aria-label': ariaLabel,
			children: values,
			currentItemIndex,
			currentValueText,
			decrementAriaLabel: decAriaLabel,
			decrementItemIndex,
			disabled,
			focusBackgroundClassName,
			handleDecrement,
			handleFlick,
			handleIncrement,
			incrementAriaLabel: incAriaLabel,
			incrementItemIndex,
			min,
			max,
			noAnimation,
			onSpotlightDisappear,
			orientation,
			reverseTransition,
			secondaryDecrementItemIndex,
			secondaryIncrementItemIndex,
			skin,
			spotlightDisabled,
			step,
			value,
			valueId,
			width,
			wrap,
			...rest
		} = props;

		const isFirst = value <= min;
		const isLast = value >= max;
		const isSecond = value <= min + step;
		const isPenultimate = value >= max - step;
		const decrementAriaLabel = `${currentValueText} ${decAriaLabel}`;
		const incrementAriaLabel = `${currentValueText} ${incAriaLabel}`;
		const transitionDuration = 150;

		const decrementValue = () => {
			const clampledValue = min < max ? clamp(min, max, value - step) : min;
			const restrictedDecrementValue = wrap ? wrapRange(min, max, value - step) : clampledValue;
			if (isFirst && !wrap) {
				return '';
			} else if (Array.isArray(values)) {
				return values;
			} else {
				return (<PickerItem key={restrictedDecrementValue} style={{direction: 'ltr'}}>{restrictedDecrementValue}</PickerItem>);
			}
		};

		const incrementValue = () => {
			const clampledValue = min < max ? clamp(min, max, value + step) : max;
			const restrictedIncrementValue = wrap ? wrapRange(min, max, value + step) : clampledValue;
			if (isLast && !wrap) {
				return '';
			} else if (Array.isArray(values)) {
				return values;
			} else {
				return (<PickerItem key={restrictedIncrementValue} style={{direction: 'ltr'}}>{restrictedIncrementValue}</PickerItem>);
			}
		};

		const secondaryDecrementValue = () => {
			const restrictedSecondaryDecrementValue = wrap ? wrapRange(min, max, value - (2 * step)) : clamp(min, max, value - (2 * step));
			if (isSecond && !wrap) {
				return '';
			} else if (Array.isArray(values)) {
				return values;
			} else {
				return (<PickerItem key={restrictedSecondaryDecrementValue} style={{direction: 'ltr'}}>{restrictedSecondaryDecrementValue}</PickerItem>);
			}
		};

		const secondaryIncrementValue = () => {
			const restrictedSecondaryIncrementValue = wrap ? wrapRange(min, max, value + (2 * step)) : clamp(min, max, value + (2 * step));
			if (isPenultimate && !wrap) {
				return '';
			} else if (Array.isArray(values)) {
				return values;
			} else {
				return (<PickerItem key={restrictedSecondaryIncrementValue} style={{direction: 'ltr'}}>{restrictedSecondaryIncrementValue}</PickerItem>);
			}
		};

		let sizingPlaceholder = null;
		if (typeof width === 'number' && width > 0) {
			sizingPlaceholder = <div aria-hidden className={css.sizingPlaceholder}>{'0'.repeat(width)}</div>;
		}

		const horizontal = orientation === 'horizontal';
		const arranger = horizontal ? SlideLeftArranger : SlideTopArranger;

		delete rest['aria-valuetext'];
		delete rest.accessibilityHint;
		delete rest.decrementAriaLabel;
		delete rest.incrementAriaLabel;
		delete rest.noAnimation;
		delete rest.onChange;
		delete rest.orientation;
		delete rest.wrap;

		return (
			<PickerRoot {...rest} onFlick={handleFlick}>
				<div className={focusBackgroundClassName} />
				{skin === 'silicon'  &&
					<PickerButtonItem
						aria-controls={valueId}
						aria-disabled={isSecond}
						aria-label={decrementAriaLabel}
						className={css.secondaryItemDecrement}
						disabled={disabled || isSecond}
						onClick={secondaryDecrementValue() === '' ? () => {} : () => {
							handleDecrement(); setTimeout(() => handleDecrement(), transitionDuration);
						}}
						onSpotlightDisappear={onSpotlightDisappear}
						spotlightDisabled={spotlightDisabled || secondaryDecrementValue() === ''}
					>
						<ViewManager
							aria-hidden
							arranger={arranger}
							className={css.viewManager}
							duration={transitionDuration}
							index={secondaryDecrementItemIndex}
							noAnimation={noAnimation || disabled}
							reverseTransition={reverseTransition}
						>
							{secondaryDecrementValue()}
						</ViewManager>
					</PickerButtonItem>
				}
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={disabled || isFirst}
					aria-label={decrementAriaLabel}
					className={css.itemDecrement}
					disabled={disabled || isFirst}
					onClick={decrementValue() === '' ? () => {} : handleDecrement}
					onSpotlightDisappear={onSpotlightDisappear}
					spotlightDisabled={spotlightDisabled || decrementValue() === ''}
				>
					<ViewManager
						aria-hidden
						arranger={arranger}
						className={css.viewManager}
						duration={transitionDuration}
						index={decrementItemIndex}
						noAnimation={noAnimation || disabled}
						reverseTransition={reverseTransition}
					>
						{decrementValue()}
					</ViewManager>
				</PickerButtonItem>
				<div
					aria-label={ariaLabel}
					aria-valuetext={currentValueText}
					className={activeClassName}
					id={valueId}
					role="spinbutton"
				>
					{sizingPlaceholder}
					<ViewManager
						aria-hidden
						arranger={arranger}
						className={css.viewManager}
						duration={transitionDuration}
						index={currentItemIndex}
						noAnimation={noAnimation || disabled}
						reverseTransition={reverseTransition}
					>
						{values}
					</ViewManager>
				</div>
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={disabled || isLast}
					aria-label={incrementAriaLabel}
					className={css.itemIncrement}
					disabled={disabled || isLast}
					onClick={incrementValue() === '' ? () => {} : handleIncrement}
					onSpotlightDisappear={onSpotlightDisappear}
					spotlightDisabled={spotlightDisabled || incrementValue() === ''}
				>
					<ViewManager
						aria-hidden
						arranger={arranger}
						className={css.viewManager}
						duration={transitionDuration}
						index={incrementItemIndex}
						noAnimation={noAnimation || disabled}
						reverseTransition={reverseTransition}
					>
						{incrementValue()}
					</ViewManager>
				</PickerButtonItem>
				{skin === 'silicon' &&
					<PickerButtonItem
						aria-controls={valueId}
						aria-disabled={isPenultimate}
						aria-label={incrementAriaLabel}
						className={css.secondaryItemIncrement}
						disabled={disabled || isPenultimate}
						onClick={secondaryIncrementValue() === '' ? () => {} : () => {
							handleIncrement(); setTimeout(() => handleIncrement(), transitionDuration);
						}}
						onSpotlightDisappear={onSpotlightDisappear}
						spotlightDisabled={spotlightDisabled || secondaryIncrementValue() === ''}
					>
						<ViewManager
							aria-hidden
							arranger={arranger}
							className={css.viewManager}
							duration={transitionDuration}
							index={secondaryIncrementItemIndex}
							noAnimation={noAnimation || disabled}
							reverseTransition={reverseTransition}
						>
							{secondaryIncrementValue()}
						</ViewManager>
					</PickerButtonItem>
				}
			</PickerRoot>
		);
	}
});

/**
 * A higher-order component that filters the values returned by the onChange event on {@link agate/internal/Picker.Picker}
 *
 * @class ChangeAdapter
 * @hoc
 * @memberof agate/internal/Picker
 * @private
 */
const ChangeAdapter = hoc((config, Wrapped) => {
	return kind({
		name: 'ChangeAdapter',

		handlers: {
			onChange: handle(
				adaptEvent(({value}) => {
					return ({value});
				},
				forward('onChange'))
			)
		},

		render: (props) => {
			return <Wrapped {...props} />;
		}
	});
});

/**
 * Applies Agate specific behaviors to [Picker]{@link agate/Picker.Picker}.
 *
 * @hoc
 * @memberof agate/internal/Picker
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const PickerDecorator = compose(
	IdProvider({generateProp: null}),
	Changeable,
	Changeable({prop: 'reverseTransition'}),
	Skinnable({prop: 'skin'})
);

const Picker = PickerDecorator(PickerBase);

export default Picker;
export {
	ChangeAdapter,
	Picker,
	PickerBase,
	PickerDecorator
};
export PickerItem from './PickerItem';
