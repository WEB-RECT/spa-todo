import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './ColTasks.module.scss'
import {Button, Typography} from "antd";
import {IColTasksData} from "../../../../pages/tasks";
import CardTask from "../../Card/CardTask/CardTask";
import {ICardTask} from "../../Card/CardTask/CardTask.interface";
import {TUid} from "../../../../types/helperTypes/helperTypes";
import {useDrop} from "react-dnd";
import CardPreview from "../../Card/CardPreview/CardPreview";

interface IProps {
    item: IColTasksData
    tasksItems: ICardTask[]
    currentParamsUid: TUid
    valueFind: string
}

const ColTasks: FC<IProps> = ({item, tasksItems, currentParamsUid, valueFind}) => {

    const [collectedProps, drop] = useDrop({
        accept: "Our first type",
        drop: () => ({col: item}),
        canDrop: (it: any) => {
            return it.card.colTasksUid !== item.uid
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverColUid: item.uid,
            canDrop: monitor.canDrop(),
        }),
    })

    const tasks = useMemo(() => {
        const filteredItems = tasksItems.filter((it) => it.colTasksUid === item.uid && it.projectUid === currentParamsUid)
        let result = filteredItems

        if (valueFind) {
            result = result.filter((it) => it.id.toString().includes(valueFind) || it.name.includes(valueFind))
        } else {
            result = filteredItems
        }

        return result
    }, [tasksItems, item.uid, currentParamsUid, valueFind])

    return (
        <div
            ref={drop}
            className={styles.col}
        >
            <div className={styles.title}>
                {
                    item.name
                }
            </div>
            <div className={styles.cards}>
                {
                    tasks.length > 0
                        ?
                        tasks.map((item, index) => (
                            <CardTask
                                key={item.uid + 'cardtask'}
                                item={item}
                            />
                        ))
                        :
                        <>
                            {
                                !collectedProps.isOver && collectedProps.isOverColUid === item.uid &&
                                <Typography.Text>
                                    Нету задач
                                </Typography.Text>
                            }
                        </>

                }
                {
                    collectedProps.isOver && collectedProps.canDrop && collectedProps.isOverColUid === item.uid &&
                    <CardPreview/>
                }
            </div>
        </div>
    );
};

export default React.memo(ColTasks);