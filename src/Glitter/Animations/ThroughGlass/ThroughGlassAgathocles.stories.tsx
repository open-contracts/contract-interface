import React, {FC, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThroughGlassAgathocles } from './ThroughGlassAgathocles';

const ThroughGlassHoverSample  : FC = ()=>{

    const [isHovered, setIsHovered] = useState(false);

    const onMouseOver = ()=>{
        setIsHovered(true)
    }

    const onMouseOut = ()=>{
        setIsHovered(false);
    }

    return (
        <ThroughGlassAgathocles glass={isHovered} style={{
            height : "200px",
            width : "200px",
            backgroundColor : "pink"
        }}> 
            <div 
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            style={{
                height : "100%",
                width : "100%"
            }}>
                Hover me
            </div>
        </ThroughGlassAgathocles>
    )

}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Glass/ThroughGlassAgathocles/ThroughGlassHoverSample',
  component: ThroughGlassHoverSample,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ThroughGlassHoverSample>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ThroughGlassHoverSample> = (args) => <ThroughGlassHoverSample {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
