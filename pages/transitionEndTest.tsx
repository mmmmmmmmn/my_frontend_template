import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

const TransitionEndTest: NextPage = () => {
    const [isTop, setIsTop] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement | null>(null);
    const isBetween = useIsBetween(isTop, targetRef.current);

    return (
        <>
            <button onClick={() => setIsTop(isTop => !isTop)}>toggle state</button>
            <Target isTop={isTop} isLeft={isBetween} ref={targetRef} />
        </>
    );
};

export default TransitionEndTest;

const useIsBetween = (isTop: boolean, target: HTMLDivElement | null): boolean => {
    const [isBetween, setIsBetween] = React.useState(isTop);

    const followOnlyTrue: VoidFunction = () => {
        if (isTop) setIsBetween(isTop);
    };

    const followOnlyFalse: VoidFunction = () => {
        if (!isTop) setIsBetween(isTop);
    };

    // isTopがtrueに変化することを検知して追従させる
    React.useEffect(followOnlyTrue, [isTop]);

    // isTopがtransition終了後にfalseなっていることを検知して追従させる
    React.useEffect(() => {
        if (target === null) return;

        // transitionend イベントは、 caniuse 上では ie, edge が unknown だった。
        // https://caniuse.com/#feat=mdn-api_htmlelement_transitionend_event
        // safari, chrome, firefox は実機にて動作確認済
        target.addEventListener('transitionend', followOnlyFalse);

        return () => target.removeEventListener('transitionend', followOnlyFalse);
    }, [isTop, target]);

    return isBetween;
};

const Target = styled.div<{ isTop: boolean; isLeft: boolean }>`
    width: 100px;
    height: 100px;
    background: red;

    transition: margin-top 0.5s;

    margin-top: ${p => (p.isTop ? 100 + 10 : 10)}px;
    margin-left: ${p => (p.isLeft ? 100 : 0)}px;
`;
