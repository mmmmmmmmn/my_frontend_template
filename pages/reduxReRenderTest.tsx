import React from 'react'
import { NextPage } from 'next'
import { connect, Provider, useDispatch, useSelector } from 'react-redux'
import { createStore, Dispatch as RawDispatch } from 'redux'

type State = number
const initialState: State = 0

const actionCreators = {
    increment: () => ({ type: 'INCREMENT' as const }),
}

type ActionTypes = ReturnType<typeof actionCreators[keyof typeof actionCreators]>
type Dispatch = RawDispatch<ActionTypes>

const counterReducer = (state = initialState, action: ActionTypes): State => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        default:
            return state
    }
}

const store = createStore(counterReducer)

const calcRoughCount = (state: State) => Math.floor(state / 10)

const ConnectedRough = connect((state: State) => ({
    roughCount: calcRoughCount(state),
}))(({ roughCount }) => {
    console.log('render ConnectedRough')

    return <>{roughCount}</>
})

const RoughByHook: React.FC = () => {
    const roughCount = useSelector<State, number>(calcRoughCount)
    console.log('render RoughByHook')

    return <>{roughCount}</>
}

const ConnectedIncrementor = connect(null, (dispatch: Dispatch) => ({
    increment: () => dispatch(actionCreators.increment()),
}))(({ increment }) => {
    console.log('render ConnectedIncrementor')

    return <button onClick={increment}>increment by connect</button>
})

const IncrementorByHook: React.FC = () => {
    const dispatch = useDispatch<Dispatch>()
    console.log('render IncrementorByHook')

    return <button onClick={() => dispatch(actionCreators.increment())}>increment by hook</button>
}

const reduxReRenderTest: NextPage = () => {
    console.log('render root')

    return (
        <Provider store={store}>
            <ConnectedRough />
            <RoughByHook />
            <ConnectedIncrementor />
            <IncrementorByHook />
        </Provider>
    )
}

export default reduxReRenderTest
