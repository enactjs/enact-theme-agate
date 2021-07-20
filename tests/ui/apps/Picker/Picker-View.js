import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';

const pickerList = [
	'Apple',
	'Banana',
	'Clementine',
	'Durian'
];

const app = (props) => <div {...props}>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker className="pickerDefault">{pickerList}</Picker>
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker defaultValue={1} disabled className="pickerDisabled">{pickerList}</Picker>
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker defaultValue={1} className="pickerWithDefaultValue">{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
