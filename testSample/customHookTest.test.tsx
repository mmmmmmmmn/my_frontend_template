import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

const useWindowSize = () => {
    const [size, setSize] = React.useState(window.innerWidth)

    const handleResize = () => setSize(window.innerWidth)

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return size
}

describe('useWindowSize', () => {
    const { result, unmount } = renderHook(useWindowSize)

    it('should return new size of window', () => {
        expect(result.current).toEqual(expect.any(Number))
        expect(result.current).not.toBe(500)

        resize()

        expect(result.current).toBe(500)
    })
    it('should not cause error when fire resize event after unmount', () => {
        unmount()

        jest.spyOn(console, 'error')

        resize()

        expect(console.error).not.toBeCalled()
    })
})

const resize = () =>
    act(() => {
        Object.defineProperty(window, 'innerWidth', { value: 500 })
        window.dispatchEvent(new Event('resize'))
    })
