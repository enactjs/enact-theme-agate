import Input from '@enact/agate/Input';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const InputView = () => (
	<>
		<Section title="Default">
			<Input alt="With No Placeholder" />
			<Input alt="With defaultValue" defaultValue="Default Value" />
			<Input alt="With Placeholder" placeholder="Placeholder" />
			<Input alt="Disabled with Placeholder" disabled placeholder="Placeholder" />
		</Section>

		<Section className={appCss.marginTop} title="With type">
			<Input alt="Number Type With Placeholder" placeholder="Placeholder" type="number" />
			<Input alt="Disabled Number Type with Value" disabled type="number" value="1234" />
			<Input alt="Password Type With Placeholder" placeholder="Placeholder" type="password" />
			<Input alt="Disabled Password Type With Value" disabled type="password" value="1234" />
		</Section>

		<Section className={appCss.marginTop} title="With iconAfter">
			<Input alt="With iconAfter" iconAfter="lock" />
			<Input alt="Disabled With iconAfter" disabled iconAfter="lock" />
		</Section>

		<Section className={appCss.marginTop} title="With dismissOnEnter">
			<Input alt="With Placeholder and dismissOnEnter" dismissOnEnter placeholder="Placeholder" />
			<Input alt="Disabled With Placeholder and dismissOnEnter" dismissOnEnter disabled placeholder="Placeholder" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Input alt="Aria-labelled" aria-label="This is a Label 0." />
			<Input alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled />
			<Input alt="Aria-labelled Number Type With Placeholder" aria-label="This is a Label 2." placeholder="Placeholder" type="number" />
			<Input alt="Aria-labelled and Disabled Number Type With Placeholder" aria-label="This is a Label 3." disabled placeholder="Placeholder" type="number" />
		</Section>
	</>
);

export default InputView;
