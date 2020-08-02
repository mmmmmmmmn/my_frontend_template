import React from 'react';
import { NextComponentType } from 'next';

const UseLayoutEffectTest: NextComponentType = () => {
    const [isShowChild, setIsShowChild] = React.useState(false);

    React.useEffect(() => setIsShowChild(true), []);

    return isShowChild ? <Child /> : null;
};

const Child: React.FunctionComponent = () => {
    const [count, increment] = useIncrement();

    console.log('render', count);

    React.useLayoutEffect(() => console.log('layout effect', count), [count]);
    React.useEffect(() => console.log('effect', count), [count]);

    return (
        <>
            <button onClick={increment}>increment</button>
            count: {count}
        </>
    );
};

const useIncrement = (): [number, VoidFunction] => {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count => count + 1);

    return [count, increment];
};

export default UseLayoutEffectTest;
