import React from 'react'
import { NextPage } from 'next'
import ResizeObserver from 'resize-observer-polyfill'
import styled from 'styled-components'

const ResizeObserverTest: NextPage = () => {
    React.useEffect(() => {
        const target = document.getElementById('target1')
        const target2 = document.getElementById('target2')
        if (target === null || target2 === null) return

        let timerId: number | null = null

        const observer = new ResizeObserver((entries) => {
            if (timerId !== null) clearTimeout(timerId)

            timerId = setTimeout(() => {
                entries.forEach((entry) => {
                    console.log(entry.target.getBoundingClientRect())
                })
            }, 100)
        })

        observer.observe(target)
        observer.observe(target2)

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Target id='target1'>target</Target>
            <Target id='target2'>target2</Target>
        </>
    )
}

export default ResizeObserverTest

const Target = styled.div`
    margin-bottom: 10px;
    border: 10px solid;
    padding: 10.3px;

    :nth-of-type(1) {
        background: red;
    }
    :nth-of-type(2) {
        background: blue;
    }
`

// const App: NextPage = () => {
//     const [count, setCount] = React.useState(0)

//     const requestRef = React.useRef(count)

//     const animate = (_: number) => {
//         setCount(count => count + 1)
//         // The 'state' will always be the initial value here
//         requestRef.current = requestAnimationFrame(animate)

//         console.log(requestRef.current)
//     }

//     React.useEffect(() => {
//         requestRef.current = requestAnimationFrame(animate)

//         return () => cancelAnimationFrame(requestRef.current)
//     }, []) // Make sure the effect runs only once

//     return <div>{count}</div>
// }

// export default App
