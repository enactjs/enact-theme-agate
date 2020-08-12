import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import {Panel} from '@enact/agate/Panels';
import {TabbedPanels, TabbedPanelsBase} from '@enact/agate/Panels/TabbedPanels';

const Config = mergeComponentMetadata('TabbedPanels', TabbedPanelsBase);
// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

storiesOf('Agate', module)
	.add(
		'TabbedPanels',
		() => {
			const [panelIndex, setIndex] = React.useState(Config.defaultProps.index || 0);
			const onSelect = (e) => {
				setIndex(e.index);
				action('onSelect')(e);
			};
			return (
				<div style={{paddingBottom: '56.25%'}}>
					<TabbedPanels
						duration={number('duration', Config, 500)}
						onClick={action('onClick')}
						index={panelIndex}
						noCloseButton={boolean('noCloseButton', Config)}
						onSelect={onSelect} // eslint-disable-line react/jsx-no-bind
						orientation={select('orientation', ['vertical', 'horizontal'], Config, 'vertical')}
						tabPosition={select('tabPosition', ['before', 'after'], Config, 'before')}
						tabs={[
							{title: 'Button', icon: 'netbook'},
							{title: 'Item', icon: 'aircirculation'},
							{title: 'LabeledIconButton', icon: 'temperature'}
						]}
					>
						<beforeTabs>
							<Button size="small" type="grid" icon="arrowlargeleft" />
						</beforeTabs>
						<afterTabs>
							<Button size="small" type="grid" icon="arrowlargeright" />
						</afterTabs>
						<Panel>
							<Button icon="netbook">Click me!</Button>
						</Panel>
						<Panel>
							<Item label="label" labelPosition="before" slotBefore={<Icon>aircirculation</Icon>}>Hello Item</Item>
						</Panel>
						<Panel className="enact-fit">
							<LabeledIconButton
								labelPosition="after"
								icon="temperature"
							>
								Hello LabeledIconButton
							</LabeledIconButton>
						</Panel>
						<Panel>
							<div>
								A simple view with no associated tab
							</div>
						</Panel>
					</TabbedPanels>
				</div>
			);
		},
		{
			text: 'The basic TabbedPanels'
		}
	);
