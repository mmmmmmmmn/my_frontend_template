import React from 'react'
import { NextPage } from 'next'

const UseRefTest: NextPage = () => {
    const countRef = React.useRef(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => console.log(countRef.current))
    React.useEffect(() => {
        countRef.current = count
    })
    React.useEffect(() => console.log(countRef.current))

    console.log(countRef.current)
    console.log('render')

    return (
        <>
            <button onClick={() => setCount(count => count + 1)}>increment state</button>
            <button
                onClick={() => {
                    countRef.current = countRef.current + 1
                }}
                onMouseLeave={() => console.log(countRef.current)}
            >
                increment ref
            </button>
            <button onClick={() => console.log(countRef.current, count)}>log</button>
            <div>
                state: {count}
                <br />
                ref: {countRef.current}
            </div>
        </>
    )
}

export default UseRefTest
