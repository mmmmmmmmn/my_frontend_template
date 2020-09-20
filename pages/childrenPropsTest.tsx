import React from 'react'
import { NextPage } from 'next'

import styled from 'styled-components'

const ChildrenPropsTest: NextPage = () => (
    <ChildrenPropsChild>
        <>top</>
        <>bottom</>
    </ChildrenPropsChild>
)

const ChildrenPropsChild: React.FunctionComponent<{
    children: [React.ReactElement, React.ReactElement]
}> = ({ children: [topChild, bottomChild] }) => (
    <>
        <TopArea>{topChild}</TopArea>
        <BottomArea>{bottomChild}</BottomArea>
    </>
)

export default ChildrenPropsTest

const TopArea = styled.div`
    background: red;
`

const BottomArea = styled.div`
    background: blue;
`
