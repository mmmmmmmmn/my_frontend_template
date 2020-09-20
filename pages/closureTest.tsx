import React from 'react'
import { NextPage } from 'next'

const useTimer = () => {
    const timerId = React.useRef<number>()

    const set = (callBack: VoidFunction) => {
        clear()

        timerId.current = setTimeout(callBack, 3000)

        console.log('set', timerId.current)
    }

    const clear = () => {
        if (timerId.current === undefined) return

        console.log('clear', timerId.current)

        clearTimeout(timerId.current)
    }

    React.useEffect(() => clear, [])

    return set
}

const ClosureTest: NextPage = () => {
    const set = useTimer()

    return <button onClick={() => set(() => console.log('fire'))}>set</button>
}

export default ClosureTest
