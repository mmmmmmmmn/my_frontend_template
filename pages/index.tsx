import React from 'react';
import { NextComponentType } from 'next';

const UseOnCommitTest: NextComponentType = () => {
    console.log('mounted / updated');

    const [someState, setSomeState] = React.useState(false);

    useOnCommit(() => {
        console.log('changed', someState);
    }, [someState]);

    return (
        <>
            <button onClick={() => setSomeState(!someState)}>toggle</button>
            someState: {`${someState}`}
        </>
    );
};

const useOnCommit = (callBack: VoidFunction, deps: React.DependencyList): void => {
    const isFirstRender = React.useRef(true);

    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timerId = setTimeout(callBack, 500);

        return () => clearTimeout(timerId);
    }, deps);
};

export default UseOnCommitTest;
