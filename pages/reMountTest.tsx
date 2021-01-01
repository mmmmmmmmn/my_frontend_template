import React from 'react'
import { NextPage } from 'next'

const ReMountTest: NextPage = () => {
    const [count, setCount] = React.useState(0)

    return (
        <>
            <button onClick={() => setCount((count) => count + 1)}>increment</button>
            {count}
            {<Child key={1} />}
            {/* {<Child key={`${count}_1`} />} */}
        </>
    )
}

const Child: React.FunctionComponent = () => {
    React.useEffect(() => console.log('mounted'), [])
    React.useEffect(() => console.log('rendered'))

    return null
}

export default ReMountTest
