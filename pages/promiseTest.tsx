import React from 'react';
import { NextComponentType } from 'next';

const PromiseTest: NextComponentType = () => {
    const [count, setCount] = React.useState(0);

    console.log(count);

    const countRef = React.useRef(count);
    React.useEffect(() => {
        countRef.current = count;
    }, [count]);

    const log = () =>
        console.log(countRef.current /* 最新のcountRef */, count /* setTimeoutボタンがクリックされたときのcount */);

    return (
        <>
            <button onClick={() => setCount(count => count + 1)}>increment</button>
            <button onClick={() => setTimeout(log, 3000)}>setTimeout</button>
            <div>
                current: {count}
                <br />
                prev: {countRef.current}
            </div>
        </>
    );
};

// const Parent: NextComponentType = () => {
//     const [count, setCount] = React.useState(0)

//     React.useEffect(() => {
//         console.log('mount, update')
//     })

//     // const increment = () => setCount(count => count + 1)
//     const increment = () => console.log('aaaaaaaaaaaaaaaa')

//     React.useEffect(() => {
//         // if (count === 0) return

//         console.log('set')
//         const timerId = setTimeout(() => {
//             console.log('fire')
//             increment()
//         }, 1000)

//         return () => {
//             console.log('clear')
//             clearTimeout(timerId)
//         }
//     }, [increment])

//     return (
//         <>
//             <button onClick={() => increment()}>start</button>
//             <button onClick={() => setCount(count => count + 1)}>cancel</button>
//             <Child count={count} />
//         </>
//     )
// }

// const Child: React.FunctionComponent<{ count: number }> = ({ count }) => <>{count}</>

export default PromiseTest;
