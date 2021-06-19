import React from 'react'
import type { NextPage } from 'next'

const ChildTest: NextPage = () => {
    console.log('render parent')

    const [count, set] = React.useState(0)

    return (
        <>
            <button onClick={() => set((count) => count + 1)}>toggle</button>
            {count}
            <Child1 count={count} />
            <Child2 />
        </>
    )
}

const Child1: React.FunctionComponent<{ count: number }> = ({ count }) => {
    console.log('render child1')

    return <>{count}</>
}
const RawChild2: React.FunctionComponent = () => {
    console.log('render child2')

    return <>child 2</>
}
const Child2: React.FunctionComponent = React.memo(RawChild2)

export default ChildTest
