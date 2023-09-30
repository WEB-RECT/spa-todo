import React, {FC, useState} from 'react';
import styles from "./CardTask.module.scss"
import {ICardTask} from "./CardTask.interface";
import {useActions} from "../../../../customHook/redux";
import {EditOutlined, MoreOutlined} from "@ant-design/icons";
import {Popover} from "antd";
import classNames from "classnames";
import PopoverItems, {IPopoverItems} from "../../PopoverItems/PopoverItems";
import {timeUnixConvert} from "../../../../helpers/timeUnixConvert";
import {useDrag} from "react-dnd";

interface IProps {
    item: ICardTask
}

const popoverItems: IPopoverItems[] = [
    {
        text: 'Редактировать',
        icon: <EditOutlined />,
        type: 'edit'
    }
]

const CardTask: FC<IProps> = ({ item }) => {

    const {
        changeActiveTaskACTION,
        editTaskACTION,
        updateColToTaskACTION,
    } = useActions()

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Our first type',
        item: {
            card: item
        },
        end: (cardTask, monitor) => {
            const dropResult: any = monitor.getDropResult()

            if (dropResult) {
                updateColToTaskACTION(dropResult.col, cardTask.card)
            }

            return dropResult
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const [open, setOpen] = useState<boolean>(false)

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    const checkClickTypePopover = (type: string) => {
        if (type === 'edit') {
            editTaskACTION(item)
        }
    }

    return (
        <>
            <div
                ref={drag}
                className={styles.card}
                onClick={(e) => {
                    const target = e.target as HTMLDivElement
                    const closest = target.closest(`.${styles.params}`)
                    const closestPopover = target.closest(`.ant-popover`)

                    if (!closest && !closestPopover) {
                        changeActiveTaskACTION(item)
                    }
                }}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                <div className={styles.top}>
                    <div className={styles.title}>
                        {
                            item.name
                        }
                    </div>
                    <Popover
                        content={
                            <PopoverItems
                                items={popoverItems}
                                onClick={(type) => {
                                    checkClickTypePopover(type)
                                    setOpen(false)
                                }}
                            />
                        }
                        title=""
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <div
                            className={classNames(styles.params, {
                                [styles.active]: open
                            })}
                        >
                            <MoreOutlined />
                        </div>
                    </Popover>
                </div>
                <div className={styles.row}>
                    <div className={styles.date}>
                        {
                            timeUnixConvert(item.date.create)
                        }
                    </div>
                    {
                        item.priority &&
                        <div className={styles.priority}>
                            🔥
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default React.memo(CardTask);