import { NextPage } from 'next'

import styled from 'styled-components'

const NestedStyledCompoonentsTest: NextPage = () => (
    <Parent>
        <Child>child</Child>
    </Parent>
)

export default NestedStyledCompoonentsTest

const Child = styled.div`
    background: blue;
`

const Parent = styled.div`
    background: red;
    padding: 10px;

    ${Child} {
        color: #fff;
    }
`
