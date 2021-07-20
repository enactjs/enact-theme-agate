import Icon from '../../../../Icon';
import RadioItem from '../../../../RadioItem';

const RadioItemTests = [
	<RadioItem>RadioItem</RadioItem>,
	<RadioItem disabled>RadioItem</RadioItem>,
	<RadioItem inline>Inline RadioItem</RadioItem>,
	<RadioItem disabled inline>RadioItem Not Checked</RadioItem>,
	<RadioItem disabled>مساء الخير</RadioItem>,
	<RadioItem inline>مساء الخير</RadioItem>,
	<RadioItem disabled>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	<RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	<RadioItem inline>ฟิ้  ไั  ஒ  து</RadioItem>,
	<RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>,
	<RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	<RadioItem selected>ฟิ้  ไั  ஒ  து</RadioItem>,

	// Selected - disabled
	<RadioItem selected disabled>RadioItem Checked</RadioItem>,

	// Selected - disabled - inline
	<RadioItem selected disabled inline>RadioItem Checked</RadioItem>,

	// Selected - inline
	<RadioItem selected inline>RadioItem Checked</RadioItem>,
	<RadioItem selected>RadioItem Checked</RadioItem>,

	// Long text selected - LTR
	<RadioItem selected>-Lorem</RadioItem>,

	// Icon slotBefore
	<RadioItem><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem inline><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem selected><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
	<RadioItem selected inline><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,

	// Custom icon - PLAT-141628
	<RadioItem icon="earphone">RadioItem</RadioItem>,
	<RadioItem icon="uninstall">RadioItem</RadioItem>,

	// *************************************************************
	// locale = 'ar-SA'

	// RadioItem* is NOT selected - RTL
	{
		locale: 'ar-SA',
		component: <RadioItem>RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem inline>Inline RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem disabled inline>RadioItem Not Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>مساء الخير</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	// RadioItem* is selected - RTL
	{
		locale: 'ar-SA',
		component: <RadioItem selected>RadioItem Checked</RadioItem>
	},
	// Selected - disabled
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled>RadioItem Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled inline>RadioItem Checked</RadioItem>
	},
	// Selected - inline
	{
		locale: 'ar-SA',
		component: <RadioItem selected inline>RadioItem Checked</RadioItem>
	},
	// Long text selected - LTR
	{
		locale: 'ar-SA',
		component: <RadioItem selected>-Lorem</RadioItem>
	}
];

export default RadioItemTests;
