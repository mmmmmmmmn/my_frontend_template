import React from 'react'
import { NextComponentType } from 'next'

const ClosureTest: NextComponentType = () => {
    const closure = () => {
        let count = 0

        const increment = () => {
            count = count + 1
            console.log(count)
        }

        return increment
    }

    const increment = closure()

    return <button onClick={increment}>increment</button>
}

export default ClosureTest
