import React from 'react'
import { NextPage } from 'next'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'styled-components'

const duration = 0.5 as const
const classNames = 'slideToggleClassNames' as const

const SlideToggleTest: NextPage = () => (
    <>
        <ListItem title='タイトル1'>
            テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1テキスト1
            <br />
            テキスト1
        </ListItem>
        <ListItem title='タイトル2'>
            テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2テキスト2
            <br />
            テキスト2
            <br />
            テキスト2
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', height: 300, background: 'red' }}>テキスト2</div>
            </div>
        </ListItem>
    </>
)

const ListItem: NextPage<{ title: string }> = ({ children, title }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <ListItemContainer>
            <Title onClick={() => setIsOpen((isOpen) => !isOpen)}>{title}</Title>
            <SlideToggle isOpen={isOpen}>
                <ListItemContent>{children}</ListItemContent>
            </SlideToggle>
        </ListItemContainer>
    )
}

const SlideToggle: NextPage<{ isOpen: boolean }> = ({ children, isOpen }) => {
    const childRef = React.useRef<HTMLDivElement>(null)

    const calcChildHeight = () => {
        if (childRef.current === null) return 0

        return childRef.current.clientHeight
    }

    return (
        <CSSTransition
            in={isOpen}
            timeout={duration * 1000}
            classNames={classNames}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            <SlideToggleContainer calcChildHeight={calcChildHeight}>
                <div ref={childRef}>{children}</div>
            </SlideToggleContainer>
        </CSSTransition>
    )
}

export default SlideToggleTest

const ListItemContainer = styled.div`
    & + & {
        margin-top: 1px;
    }
`

const Title = styled.div`
    background: blue;
    color: #fff;
    cursor: pointer;
`

const ListItemContent = styled.div`
    background: skyblue;
    color: #fff;
    padding: 10px;
    word-break: break-all;
`

const SlideToggleContainer = styled.div<{ calcChildHeight: () => number }>`
    transition: ${duration}s;
    overflow: hidden;
    &:not([class*=${classNames}]) {
        height: 0;
    }

    &.${classNames}-enter {
        height: 0;
    }
    &.${classNames}-enter-active {
        height: ${(p) => p.calcChildHeight()}px;
    }
    &.${classNames}-enter-done {
        height: auto;
        overflow: visible;
    }
    &.${classNames}-exit {
        height: ${(p) => p.calcChildHeight()}px;
    }
    &.${classNames}-exit-active {
        height: 0;
    }
    &.${classNames}-exit-done {
        height: 0;
    }
`
