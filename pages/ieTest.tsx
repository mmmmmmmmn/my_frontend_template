import React from 'react';
import { NextPage } from 'next';
import 'intersection-observer';
import ResizeObserver from 'resize-observer-polyfill';
import styled, { keyframes } from 'styled-components';

const IeTest: NextPage = () => (
    <>
        <TransitionEndTest />
        <AnimationEndTest />
        <ResizeObserverPolyfillTest />
        <IntersectionObserverPolyfillTest />
    </>
);

const TransitionEndTest: React.FunctionComponent = () => {
    const [isShow, setIsShow] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);

    const onTransitionEnd = () => console.log('transitionend');

    React.useEffect(() => {
        if (targetRef.current === null) return;
        targetRef.current.addEventListener('transitionend', onTransitionEnd);

        return () => {
            if (targetRef.current === null) return;
            targetRef.current.removeEventListener('transitionend', onTransitionEnd);
        };
    }, []);

    return (
        <>
            <button onClick={() => setIsShow(isShow => !isShow)}>toggle(transitionend)</button>
            <TransitionTarget ref={targetRef} isShow={isShow} />
        </>
    );
};

const AnimationEndTest: React.FunctionComponent = () => {
    const [isShow, setIsShow] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);

    const onAnimationEnd = () => {
        console.log('animationend');
        setIsShow(false);
    };

    React.useEffect(() => {
        if (targetRef.current === null) return;
        targetRef.current.addEventListener('animationend', onAnimationEnd);

        return () => {
            if (targetRef.current === null) return;
            targetRef.current.removeEventListener('animationend', onAnimationEnd);
        };
    }, []);

    return (
        <>
            <button onClick={() => setIsShow(true)}>start(animationend)</button>
            <AnimationTarget ref={targetRef} className={isShow ? 'show' : undefined} />
        </>
    );
};

const ResizeObserverPolyfillTest: React.FunctionComponent = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (targetRef.current === null) return;

        const observer = new ResizeObserver(entries =>
            entries.forEach(entry => console.log('resize polyfill', entry.target.getBoundingClientRect().width)),
        );

        observer.observe(targetRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            ResizeObserverPolyfillTestTarget
            <ResizeObserverPolyfillTestTarget ref={targetRef} />
        </>
    );
};

const IntersectionObserverPolyfillTest: React.FunctionComponent = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (targetRef.current === null) return;

        const observer = new IntersectionObserver(entries =>
            entries.forEach(entry =>
                console.log('intersect with polyfill', entry.target.getBoundingClientRect().width),
            ),
        );

        observer.observe(targetRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            IntersectionObserverPolyfillTarget
            <IntersectionObserverPolyfillTarget ref={targetRef} />
        </>
    );
};

export default IeTest;

const transition = 1;

const TransitionTarget = styled.div<{ isShow: boolean }>`
    width: 100px;
    height: 100px;
    background: red;
    transition: ${transition}s;
    opacity: ${p => (p.isShow ? 1 : 0)};
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const AnimationTarget = styled.div`
    width: 100px;
    height: 100px;
    background: red;

    &.show {
        animation: ${rotate} ${transition}s linear;
    }
`;

const ResizeObserverPolyfillTestTarget = styled.div`
    height: 100px;
    background: red;
`;

const IntersectionObserverPolyfillTarget = styled.div`
    margin-top: 500px;
    height: 100px;
    background: red;
`;
