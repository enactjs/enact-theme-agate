/**
 * Agate styled fan speed control components and behaviors.
 *
 * @example
 * <FanSpeedControl icon="fan" max={10} />
 *
 * @module agate/FanSpeedControl
 * @exports FanSpeedControl
 * @exports FanSpeedControlBase
 * @exports FanSpeedControlDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

/**
 * An Agate component for displaying fan speed.
 * This component is most often not used directly but may be composed within another component as it
 * is within [FanSpeedControl]{@link agate/FanSpeedControl.FanSpeedControl}.
 *
 * @class FanSpeedControlBase
 * @memberof agate/FanSpeedControl
 * @ui
 * @public
 */
const FanSpeedControlBase = kind({
	name: 'FanSpeedControlBase',

	propTypes: /** @lends agate/FanSpeedControl.FanSpeedControlBase.prototype */ {
		/**
		 * ArcPicker icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * The maximum value of FanSpeed.
		 *
		 * @type {Number}
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of FanSpeed.
		 *
		 * @type {Number}
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * Called when value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * The maximum size of ArcPicker. The number of arc segments to be rendered.
		 *
		 * @type {Number}
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Value of FanSpeedControl.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		value: 1
	},

	styles: {
		css,
		className: 'fanSpeedControl'
	},

	render: ({icon, max, min, onChange, value, ...rest}) => {
		const children = [];

		for (let i = min; i <= max; i++) {
			children.push(i);
		}

		return (
			<div {...rest}>
				<ArcPicker
					endAngle={312}
					max={max}
					min={min}
					onChange={onChange}
					selectionType="cumulative"
					slotCenter={
						<>
							<Icon className={css.fanIcon} css={css}>{icon}</Icon>
							<span className={css.fanValue}>{value}</span>
						</>
					}
					value={value}
				>{children}</ArcPicker>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [FanSpeedControl]{@link agate/FanSpeedControl.FanSpeedControlBase} components.
 *
 * @hoc
 * @memberof agate/FanSpeedControl
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const FanSpeedControlDecorator = compose(
	Changeable,
	Skinnable
);

const FanSpeedControl = FanSpeedControlDecorator(FanSpeedControlBase);

export default FanSpeedControl;
export {
	FanSpeedControl,
	FanSpeedControlBase,
	FanSpeedControlDecorator
};
