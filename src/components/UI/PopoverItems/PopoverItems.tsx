import React, {FC, ReactNode} from 'react';
import styles from './PopoverItems.module.scss'

export interface IPopoverItems {
    text: string
    icon: ReactNode
    type: string
}

interface IProps {
    items: IPopoverItems[]
    onClick: (type: string) => void
}

const PopoverItems: FC<IProps> = ({ items, onClick }) => {
    return (
        <div className={styles.items}>
            {
                items.map((item, index) => (
                    <div
                        key={item.text + index + 'popover'}
                        className={styles.item}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()

                            onClick(item.type)
                        }}
                    >
                        <div className={styles.icon}>
                            {
                                item.icon
                            }
                        </div>
                        <div className={styles.text}>
                            {
                                item.text
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default React.memo(PopoverItems);