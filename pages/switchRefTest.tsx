import React from 'react';
import { NextComponentType } from 'next';

import styled from 'styled-components';

const SwitchRefTest: NextComponentType = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const [state, setState] = React.useState(false);

    React.useEffect(() => {
        if (targetRef.current === null) return;

        console.log(targetRef.current.getBoundingClientRect()['height']);
    }, [state]);

    return (
        <>
            <button onClick={() => setState(state => !state)}>toggle</button>
            {state ? <Target1 ref={targetRef} /> : <Target2 ref={targetRef} />}
        </>
    );
};

export default SwitchRefTest;

const Target1 = styled.div`
    background: red;
    height: 100px;
`;

const Target2 = styled.div`
    background: blue;
    height: 200px;
`;
