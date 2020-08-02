import React from 'react';
import { NextComponentType } from 'next';

const UseEffectDepsAndClearTest: NextComponentType = () => {
    const [state1, setState1] = React.useState(0);
    const [state2, setState2] = React.useState(0);

    console.log(state1, 'render');

    React.useEffect(() => {
        console.log(state1, 'after render, after state1 updated');

        return () => console.log(state1, 'after render, before state1 updated');
    }, [state1]);

    return (
        <>
            <button onClick={() => setState1(state1 => state1 + 1)}>toggle1</button>
            {state1}
            <button onClick={() => setState2(state2 => state2 + 1)}>toggle2</button>
            {state2}
        </>
    );
};

export default UseEffectDepsAndClearTest;
