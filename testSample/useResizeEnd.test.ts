import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

const useResizeEnd = (onResizeEnd: VoidFunction) => {
    const timerId = React.useRef<number>();

    const clear = () => {
        if (timerId.current !== undefined) clearTimeout(timerId.current);
    };

    const onResize = () => {
        clear();
        timerId.current = setTimeout(onResizeEnd, 100);
    };

    React.useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            clear();
            window.removeEventListener('resize', onResize);
        };
    }, []);
};

const mount = () => {
    const callBack = jest.fn();
    const { unmount } = renderHook(() => useResizeEnd(callBack));

    return { callBack, unmount };
};

const resize = () => window.dispatchEvent(new Event('resize'));

jest.useFakeTimers();

describe('useResizeEnd', () => {
    it('should execute callback when window resize', () => {
        const { callBack } = mount();

        resize();

        expect(callBack).not.toHaveBeenCalled();

        jest.runAllTimers();

        expect(callBack).toHaveBeenCalled();
    });
    it('should detect only window resize completion  ', () => {
        const { callBack } = mount();

        resize();
        resize();
        resize();
        resize();

        jest.runAllTimers();

        expect(callBack).toHaveBeenCalledTimes(1);

        resize();
        resize();
        resize();

        jest.runAllTimers();

        expect(callBack).toHaveBeenCalledTimes(2);
    });
    it('should not detect window resize after unmount', () => {
        const { callBack, unmount } = mount();

        unmount();

        resize();

        jest.runAllTimers();

        expect(callBack).not.toHaveBeenCalled();
    });
    it('should cancel callback booking if the component is unmount immediately after window resize', () => {
        const { callBack, unmount } = mount();

        resize();
        unmount();

        jest.runAllTimers();

        expect(callBack).not.toHaveBeenCalled();
    });
});
