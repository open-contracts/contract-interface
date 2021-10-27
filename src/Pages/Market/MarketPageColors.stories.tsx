import React, {FC} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HomePage } from '.';
import { ItemProvider } from '../../Sytems/ItemProvider';
import { ColorProvider } from '../../Theme/ColorProvider';
import { Colors } from '../../Theme';
import { generateRandomDappItems } from '../../Demo';

const HomePageWithColors : FC<typeof Colors> =(props)=>{

    const initItems = generateRandomDappItems(5);

    return (
        <ItemProvider initialItems={initItems}>
            <ColorProvider {...props}>
                <HomePage/>
            </ColorProvider>
        </ItemProvider>
    )

}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Logos/HomePageWithColors',
  component: HomePageWithColors,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof HomePageWithColors>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HomePageWithColors> = (args) => <HomePageWithColors {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    ...Colors
};
