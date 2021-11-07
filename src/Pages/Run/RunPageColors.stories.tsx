import React, {FC} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RunPage } from '.';
import { ItemProvider } from '../../Sytems/ItemProvider';
import { ColorProvider } from '../../Theme/ColorProvider';
import { Colors } from '../../Theme';
import { generateRandomDappItems } from '../../Demo';

const RunPageWithColors : FC<typeof Colors> =(props)=>{

    const initItems = generateRandomDappItems(5);

    return (
        <ItemProvider initialItems={initItems}>
            <ColorProvider {...props}>
                <RunPage/>
            </ColorProvider>
        </ItemProvider>
    )

}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Logos/RunPageWithColors',
  component: RunPageWithColors,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof RunPageWithColors>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RunPageWithColors> = (args) => <RunPageWithColors {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    ...Colors
};
