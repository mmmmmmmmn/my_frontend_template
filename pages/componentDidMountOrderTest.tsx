import React from 'react'
import type { NextPage } from 'next'

const ComponentDidMountOrderTest: NextPage = () => {
    React.useEffect(() => console.log('parent'), [])

    return <Child />
}

const Child: NextPage = () => {
    React.useEffect(() => console.log('child'), [])

    return <div>child</div>
}

export default ComponentDidMountOrderTest
