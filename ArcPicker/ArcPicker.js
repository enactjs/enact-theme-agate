/**
 * Agate styled arc picker components and behaviors.
 *
 * @example
 * <ArcPicker backgroundColor="#444444" endAngle={200} foregroundColor="#eeeeee" selectionType="single" startAngle={0} />
 *
 * @module agate/ArcPicker
 * @exports ArcPicker
 * @exports ArcPickerBase
 * @exports ArcPickerDecorator
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import Skinnable from '../Skinnable';

import ArcPickerBehaviorDecorator from './ArcPickerBehaviourDecorator';

import css from './ArcPicker.module.less';

/**
 * An Agate component for displaying an arc picker {@link agate/ArcPicker}.
 *
 * @class ArcPickerBase
 * @memberof agate/ArcPicker
 * @ui
 * @public
 */
const ArcPickerBase = kind({
	name: 'ArcPickerBase',

	propTypes: /** @lends agate/ArcPicker.ArcPickerBase.prototype */ {
		/**
		 * The value options of ArcPicker.
		 *
		 * @type {Array}
		 * @public
		 */
		values: PropTypes.array.isRequired,

		/**
		 * The color of the unselected arcs.
		 *
		 * @type {String}
		 * @default #444444
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * The end angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {number}
		 * @default 310
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The color of the selected arcs.
		 *
		 * @type {number}
		 * @default #eeeeee
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * The selection type of ArcPicker.
		 *
		 * @type {String}
		 * @public
		 */
		selectionType: PropTypes.oneOf(['single', 'cumulative']),

		/**
		 * Called to set the value of ArcPicker.
		 *
		 * @type {Function}
		 * @public
		 */
		setValue: PropTypes.func,

		/**
		 * The start angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {number}
		 * @default 50
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * Value of ArcPicker.
		 *
		 * @type {Number|String}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	},

	defaultProps: {
		backgroundColor: '#eeeeee',
		endAngle: 310,
		foregroundColor: '#444444',
		startAngle: 50
	},

	styles: {
		css,
		className: 'arcPicker'
	},

	computed: {
		arcSegments: (props) => {
			const {backgroundColor, endAngle, foregroundColor, onClick, values, selectionType, startAngle, value} = props;

			return (
				values.map((option, index) => {
					// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const pauseAngle = 2;
					const arcSegments = values.length;
					const arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					const arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;

					const color = (selectionType === 'cumulative' && value > option || value === option) ? foregroundColor : backgroundColor;

					return (
						<Arc
							className={css.arc}
							color={color}
							endAngle={arcEndAngle}
							key={index}
							onClick={onClick(option)}
							radius={150}
							startAngle={arcStartAngle}
							strokeWidth={5}
						/>
					);
				}));
		}
	},

	render: ({arcSegments, children, ...rest}) => {
		delete rest.backgroundColor;
		delete rest.endAngle;
		delete rest.foregroundColor;
		delete rest.values;
		delete rest.selectionType;
		delete rest.setValue;
		delete rest.startAngle;
		delete rest.value;

		return (
			<div className={css.arcPicker} {...rest}>
				{arcSegments}
				<div className={css.valueDisplay}>
					{children}
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcPicker]{@link agate/ArcPicker.ArcPicker} components.
 *
 * @hoc
 * @memberof agate/ArcPicker
 * @mixes agate/ArcPicker.ArcPickerBehaviorDecorator
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcPickerDecorator = compose(
	ArcPickerBehaviorDecorator,
	Skinnable
);

/**
 * An arc picker component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcPicker backgroundColor="#444444" endAngle={200} foregroundColor="#eeeeee" selectionType="single" startAngle={0} />
 *
 * @class ArcPicker
 * @memberof agate/ArcPicker
 * @extends agate/ArcPicker.ArcPickerBase
 * @mixes agate/ArcPicker.ArcPickerDecorator
 * @ui
 * @public
 */
const ArcPicker = ArcPickerDecorator(ArcPickerBase);

export default ArcPicker;
export {
	ArcPicker,
	ArcPickerBase,
	ArcPickerDecorator
};
