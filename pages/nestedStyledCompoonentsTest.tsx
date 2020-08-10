import React from 'react';
import { NextComponentType } from 'next';

import styled from 'styled-components';

const NestedStyledCompoonentsTest: NextComponentType = () => (
    <Parent>
        <Child>child</Child>
    </Parent>
);

export default NestedStyledCompoonentsTest;

const Child = styled.div`
    background: blue;
`;

const Parent = styled.div`
    background: red;
    padding: 10px;

    ${Child} {
        color: #fff;
    }
`;
