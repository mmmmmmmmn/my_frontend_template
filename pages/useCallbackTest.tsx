import React from 'react'
import { NextComponentType } from 'next'

const UseCallbackTest: NextComponentType = () => {
    const [count, setCount] = React.useState(0)

    const rawCallback = () => console.log('raw callback')
    const memorizedCallBack = React.useCallback(() => console.log('memorized callback'), [])

    return (
        <>
            <button onClick={() => setCount(count => count + 1)}>increment</button>
            {count}
            <NoMemo callBack={rawCallback} />
            <Memo callBack={memorizedCallBack} />
        </>
    )
}

const NoMemo: React.FunctionComponent<{ callBack: VoidFunction }> = ({ callBack }) => {
    callBack()

    return <div>child</div>
}
const Memo: typeof NoMemo = React.memo(NoMemo)

export default UseCallbackTest
