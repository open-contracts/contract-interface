import React from 'react';
import { mount } from '@cypress/react';
import {MainSegment} from "./MainSegment";

it('Renders', () => {
  mount(<MainSegment />);
});