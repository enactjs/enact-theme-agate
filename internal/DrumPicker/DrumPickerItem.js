import kind from '@enact/core/kind';
import Marquee from '@enact/ui/Marquee';

import css from './DrumPicker.module.less';

/**
 * Renders an Agate-styled Picker Item without any behavior.
 *
 * @class DrumPickerItemBase
 * @memberof agate/DrumPickerItem
 * @extends ui/Marquee.Marquee
 * @ui
 * @private
 */
const DrumPickerItemBase = kind({
	name: 'DrumPickerItem',

	styles: {
		css,
		className: 'item',
		publicClassNames: true
	},

	render: (props) => (
		<Marquee {...props} alignment="center" />
	)
});

/**
 * An Agate styled DrumPickerItem with built-in support for marqueed text.
 *
 * @class DrumPickerItem
 * @memberof agate/DrumPickerItem
 * @extends agate/DrumPickerItem.DrumPickerItemBase
 * @ui
 * @private
 */
export default DrumPickerItemBase;
export {
	DrumPickerItemBase as DrumPickerItem,
	DrumPickerItemBase
};
