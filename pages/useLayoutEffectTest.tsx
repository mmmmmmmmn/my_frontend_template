import React from 'react'
import { NextComponentType } from 'next'

const UseLayoutEffectTest: NextComponentType = () => {
    const [isShowChild, setIsShowChild] = React.useState(false)

    React.useEffect(() => setIsShowChild(true), [])

    return isShowChild ? <Child /> : null
}

const Child: React.FunctionComponent = () => {
    const [count, setCount] = React.useState(0)

    console.log('render', count)

    React.useLayoutEffect(() => console.log('layout effect', count), [count])
    React.useEffect(() => console.log('effect', count), [count])

    return (
        <>
            <button onClick={() => setCount(count => count + 1)}>increment</button>
            count: {count}
        </>
    )
}

export default UseLayoutEffectTest
