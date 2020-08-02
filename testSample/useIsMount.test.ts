import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

const useIsMount = () => {
    const isMount = React.useRef(false);

    React.useEffect(() => {
        isMount.current = true;

        return () => {
            isMount.current = false;
        };
    }, []);

    return isMount;
};

const mount = () => {
    const {
        result: { current: isMountRef },
        unmount,
    } = renderHook(useIsMount);

    return { isMountRef, unmount };
};

describe('useIsMount', () => {
    it('should be true while mounting', () => {
        const { isMountRef } = mount();

        expect(isMountRef.current).toBe(true);
    });
    it('should be false when not mounted', () => {
        const { isMountRef, unmount } = mount();

        unmount();

        expect(isMountRef.current).toBe(false);
    });
});
