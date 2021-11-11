import React, {FC, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MutateColorAgathaChristie } from './MutateColorAgathaChristie';

const MutateColorPinkOverlaySampleSample  : FC = ()=>{

    const [isHovered, setIsHovered] = useState(false);

    const onMouseOver = ()=>{
        setIsHovered(true)
    }

    const onMouseOut = ()=>{
        setIsHovered(false);
    }

    const filter = "brightness(100%)";

    const transitionFilter = (filter : string)=>{

        const degMatch = filter.match(/(\d+.{0,1}\d*)\%/)

        

        const deg =  Number(degMatch && degMatch.length ? degMatch[1] : 1);
        
        const outDeg = deg + ((Math.random() * 20) - 10);

        return `brightness(${outDeg}%)`

    }

    return (
        <MutateColorAgathaChristie 
        speed={80}
        initFilter={filter}
        transitionFilter={transitionFilter}
        style={{
            height : "200px",
            width : "200px",
        }}> 
            <span style={{
                color : 'gray'
            }}>Hello</span> <span style={{
                color : "black"
            }}>darkness</span> <span style={{
                color : "blue"
            }}>my old friend.</span>
        </MutateColorAgathaChristie>
    )

}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MutateColor/MutateColorAgathaChristie/MutateColorPinkOverlaySampleSample',
  component: MutateColorPinkOverlaySampleSample,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof MutateColorPinkOverlaySampleSample>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MutateColorPinkOverlaySampleSample> = (args) => <MutateColorPinkOverlaySampleSample {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
