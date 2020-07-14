import React from 'react'
import { NextComponentType } from 'next'

const useTimer = () => {
    let timerId: number | undefined

    const set = (callBack: VoidFunction) => {
        clear()

        timerId = setTimeout(callBack, 3000)

        console.log('set', timerId)
    }

    const clear = () => {
        if (timerId === undefined) return

        console.log('clear', timerId)

        clearTimeout(timerId)
    }

    React.useEffect(() => clear, [])

    return set
}

const ClosureTest: NextComponentType = () => {
    const set = useTimer()

    return <button onClick={() => set(() => console.log('fire'))}>set</button>
}

export default ClosureTest
