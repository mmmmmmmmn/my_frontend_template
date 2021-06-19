import React from 'react'
import type { NextPage } from 'next'

const ViewOnStateTest: NextPage = () => {
    const [content, setSomeState] = React.useState<React.ReactElement | null>(<div>initial</div>)
    const isContent1 = React.useRef(false)

    const toggle = () => {
        isContent1.current = !isContent1.current
        setSomeState(isContent1.current ? Content1({}) : Content2({}))
    }

    return (
        <>
            <button onClick={toggle}>toggle</button>
            content: {content}
        </>
    )
}

const Content1: React.VFC = () => <h1>content1</h1>
const Content2: React.VFC = () => <h2>content2</h2>

export default ViewOnStateTest
