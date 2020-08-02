import React from 'react';
import { NextComponentType } from 'next';

const ChildTest: NextComponentType = () => {
    console.log('render parent');

    const [count, set] = React.useState(0);

    return (
        <>
            <button onClick={() => set(count => count + 1)}>toggle</button>
            {count}
            <Child1 count={count} />
            <Child2 />
        </>
    );
};

const Child1: React.FunctionComponent<{ count: number }> = ({ count }) => {
    console.log('render child1');

    return <>{count}</>;
};
const Child2: React.FunctionComponent = React.memo(() => {
    console.log('render child2');

    return <>child 2</>;
});

export default ChildTest;
