import { ElementType, ReactNode } from 'react';
import styles from './Button.scss';

export type ButtonProps = {
    children: ReactNode;
    type: ElementType;
}

export function Button({
    children,
    type: Type = 'button'
}: ButtonProps) {
    return (
        <Type className={styles.button}>
            {children}
        </Type>
    )
}