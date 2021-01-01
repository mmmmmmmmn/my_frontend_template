import React from 'react'
import { useTransition, animated } from 'react-spring'

import { transition } from '../config/styles'

const FadeToggle: React.FunctionComponent<{ isShow: boolean }> = (p) => {
    const transitions = useTransition(p.isShow, null, {
        config: { duration: transition * 1000 },
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        unique: true,
    })

    return (
        <>
            {transitions.map(
                ({ item, props, key }) =>
                    item && (
                        <animated.div key={key} style={props}>
                            {p.children}
                        </animated.div>
                    ),
            )}
        </>
    )
}

export default FadeToggle
