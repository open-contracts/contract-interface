import React, {FC, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GrowOnEventAchamaenid } from '.';

const GrowOnHoverSample  : FC = ()=>{

    const [isHovered, setIsHovered] = useState(false);

    const onMouseOver = ()=>{
        setIsHovered(true)
    }

    const onMouseOut = ()=>{
        setIsHovered(false);
    }

    return (
        <GrowOnEventAchamaenid grow={isHovered} style={{
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

            </div>
        </GrowOnEventAchamaenid>
    )

}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Grow/GrowOnEventAchamaenid/GrowOnHoverSample',
  component: GrowOnHoverSample,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GrowOnHoverSample>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GrowOnHoverSample> = (args) => <GrowOnHoverSample {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
