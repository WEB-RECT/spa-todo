import { Typography } from "antd";
import React, { FC, useState } from "react";
import { useActions } from "../../../../customHook/redux";
import {
    timeUnixConvert,
    timeUnixConvertDuration,
} from "../../../../helpers/timeUnixConvert";
import Comments from "../../../Comments/Comments";
import FormItem from "../../Form/FormItem/FormItem";
import SubTasks from "../../SubTasks/SubTasks";
import { ICardTask } from "../CardTask/CardTask.interface";
import styles from "./CardTaskOpened.module.scss";

interface IProps {
    activeTask: ICardTask;
}

const CardTaskOpened: FC<IProps> = ({ activeTask }) => {
    const { changeSubTasksACTION } = useActions();

    const [timeWork, setTimeWork] = useState(
        timeUnixConvertDuration(
            activeTask.date.work || 0,
            activeTask.date.end || Date.now(),
        ),
    );

    setInterval(() => {
        setTimeWork(
            timeUnixConvertDuration(
                activeTask.date.work || 0,
                activeTask.date.end || Date.now(),
            ),
        );
    }, 1000);

    console.log(activeTask);

    return (
        <div className={styles.block}>
            {styles.description && (
                <FormItem label="Описание">
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: activeTask.description,
                        }}
                    ></div>
                </FormItem>
            )}
            {activeTask.subTasks.length > 0 && (
                <FormItem label="Субзадачи">
                    <SubTasks
                        tasks={activeTask.subTasks}
                        type="visible"
                        onChange={(subTasks) =>
                            changeSubTasksACTION(activeTask.uid, subTasks)
                        }
                    />
                </FormItem>
            )}
            {activeTask.files.length > 0 && (
                <FormItem label="Прикрепленные файлы">
                    <div className={styles.files}>
                        {activeTask.files.map((item, index) => (
                            <div
                                key={item.preview + index + "file"}
                                className={styles.file}
                            >
                                <img
                                    src={item.preview}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </FormItem>
            )}
            {
                <FormItem label="Время">
                    <Typography.Text>
                        Создание: {timeUnixConvert(activeTask.date.create)}
                    </Typography.Text>
                    <br />
                    {activeTask.date.work && (
                        <>
                            <Typography.Text>
                                Время в работе: {timeWork}
                            </Typography.Text>
                            <br />
                        </>
                    )}
                    {activeTask.date.end && (
                        <Typography.Text>
                            Закончен: {timeUnixConvert(activeTask.date.end)}
                        </Typography.Text>
                    )}
                </FormItem>
            }
            {
                <FormItem label="Статус">
                    <Typography.Text>{activeTask.status}</Typography.Text>
                </FormItem>
            }
            {
                <FormItem label="Комментарии">
                    <Comments root={null} />
                </FormItem>
            }
        </div>
    );
};

export default React.memo(CardTaskOpened);
