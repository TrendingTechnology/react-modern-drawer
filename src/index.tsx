import * as React from 'react'
import './styles.scss'

type Props = {
    open: boolean
    onClose: () => void
    direction: 'left' | 'right' | 'top' | 'bottom'
    children?: React.ReactNode
    duration?: number
    overlayOpacity?: number
    overlayColor?: String
    style?: React.CSSProperties
    zIndex?: number
    size?: number
}

const getDirectionStyle = (
    dir: string,
    size?: number,
): {} | React.CSSProperties => {
    switch (dir) {
        case 'left':
            return {
                top: 0,
                left: 0,
                transform: 'translate3d(-100%, 0, 0)',
                width: size,
                height: '100vh',
            }
        case 'right':
            return {
                top: 0,
                right: 0,
                transform: 'translate3d(100%, 0, 0)',
                width: size,
                height: '100vh',
            }
        case 'bottom':
            return {
                left: 0,
                right: 0,
                bottom: 0,
                transform: 'translate3d(0, 100%, 0)',
                width: '100%',
                height: size,
            }
        case 'top':
            return {
                left: 0,
                right: 0,
                top: 0,
                transform: 'translate3d(0, -100%, 0)',
                width: '100%',
                height: size,
            }

        default:
            return {}
    }
}

const EZDrawer: React.FC<Props> = function ({
    open,
    onClose = () => {},
    children,
    style,
    overlayColor = '#000',
    overlayOpacity = 0.4,
    zIndex = 100,
    duration = 500,
    direction,
    size = 250,
}): JSX.Element {
    const overlayStyles: React.CSSProperties = {
        backgroundColor: `${overlayColor}`,
        opacity: `${overlayOpacity}`,
        zIndex: zIndex,
    }

    const drawerStyles: React.CSSProperties = {
        zIndex: zIndex + 1,
        transitionDuration: `${duration}ms`,
        ...getDirectionStyle(direction, size),
        ...style,
    }

    return (
        <div id='EZDrawer'>
            <input
                type='checkbox'
                id='EZDrawer__checkbox'
                onChange={onClose}
                checked={open}
            />
            <nav
                role='navigation'
                id='EZDrawer__container'
                style={drawerStyles}
            >
                {children}
            </nav>
            <label
                htmlFor='EZDrawer__checkbox'
                id='EZDrawer__overlay'
                style={overlayStyles}
            />
        </div>
    )
}

export default EZDrawer
