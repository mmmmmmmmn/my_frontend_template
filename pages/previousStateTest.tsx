import React from 'react'

const Counter: React.FC = () => {
    const [count, setCount] = React.useState(0)
    const prevCount = usePrevious(count)
    console.log(prevCount)
    return (
        <>
            <h1>
                Now: {count}, before: {prevCount}
            </h1>
            <button onClick={() => setCount((count) => count + 1)}>increment</button>
        </>
    )
}

const usePrevious = (value: number) => {
    const ref = React.useRef(0)

    // render直後に実行
    React.useEffect(() => {
        console.log('set', value)
        ref.current = value
    })
    return ref.current
}

export default Counter
