import React, { useCallback } from 'react'
import { NextPage } from 'next'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// state
type CounterState = number
type State = { counter: CounterState }

// action creator
const actionCreators = {
    add: (num: number) => ({ type: 'ADD' as const, payload: num }),
    increment: (str: string) => ({ type: 'INCREMENT' as const, payload: str }),
}

type ActionTypes = ReturnType<typeof actionCreators[keyof typeof actionCreators]>

const thunkAdd: (num: number) => ThunkAction<void, State, undefined, ActionTypes> =
    (num = 1) =>
    (dispatch, getState) => {
        console.log('debug', dispatch)
        console.log('debug', getState)
        console.log('debug', num)
    }

// reducer
const counterReducer = (state: CounterState = 0, action: ActionTypes): CounterState => {
    switch (action.type) {
        case 'ADD':
            return state + action.payload
    }
    return state
}

const store = createStore(combineReducers({ counter: counterReducer }), composeWithDevTools(applyMiddleware(thunk)))

type StoreProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
type OwnProps = Record<string, unknown>

// component
const Index: React.VFC<StoreProps & DispatchProps & OwnProps> = (props) => {
    const handleAdd = useCallback(() => props.add(12345), [props.add])
    return (
        <div>
            <p>counter {props.counter}</p>
            <button onClick={handleAdd}>+</button>
        </div>
    )
}

const mapStateToProps = ({ counter }: State) => ({
    counter,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, ActionTypes>) => ({
    add: (i: number) => dispatch(thunkAdd(i)),
    aaaaaaaaa: (num: number) => dispatch(actionCreators.add(num)),
})

// redux connect
const ConnectedIndex = connect(mapStateToProps, mapDispatchToProps)(Index)

const Page: NextPage = () => (
    <Provider store={store}>
        <ConnectedIndex />
    </Provider>
)

// next.js page
export default Page
