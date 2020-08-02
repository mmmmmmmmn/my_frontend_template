import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

const useWindowSize = () => {
    const [size, setSize] = React.useState(window.innerWidth);

    const handleResize = () => setSize(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
};

const mount = () => {
    const { result: size, unmount } = renderHook(useWindowSize);

    return { size, unmount };
};

const resize = () =>
    act(() => {
        Object.defineProperty(window, 'innerWidth', { value: 500 });
        window.dispatchEvent(new Event('resize'));
    });

describe('useWindowSize', () => {
    it('should return new size of window', () => {
        const { size } = mount();

        expect(size.current).toEqual(expect.any(Number));
        expect(size.current).not.toBe(500);

        resize();

        expect(size.current).toBe(500);
    });
    it('should not cause error when fire resize event after unmount', () => {
        const { unmount } = mount();

        unmount();

        jest.spyOn(console, 'error');

        resize();

        expect(console.error).not.toBeCalled();
    });
});
