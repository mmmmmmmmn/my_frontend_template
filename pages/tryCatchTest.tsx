import { NextComponentType } from 'next';

// const wait = (i: number) =>
//     new Promise((resolve, reject) =>
//         setTimeout(() => {
//             if (i === 3) reject()

//             resolve()
//         }, 1000),
//     )

// const increment = (i: number) => {
//     wait(i)
//         .then(() => {
//             console.log('fire', i)
//             increment(i + 1)
//         })
//         .catch(() => {
//             console.log('error', i)
//             throw i
//         })
// }

// increment(0)

const increment = (i: number) => {
    try {
        setTimeout(() => {
            console.log('fire', i);
            if (i === 3) throw i;
            increment(i + 1);
        }, 1000);
    } catch (e) {
        console.log('drftgyhuijk', e, i);
    }
};

increment(0);

const TryCatchTest: NextComponentType = () => <></>;

export default TryCatchTest;
