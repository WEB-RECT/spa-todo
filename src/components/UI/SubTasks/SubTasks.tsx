import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import React, { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ISubTasks } from "../Card/CardTask/CardTask.interface";
import styles from "./SubTasks.module.scss";

interface IProps {
    tasks: ISubTasks[];
    type?: "visible" | "change";
    onChange: (tasks: ISubTasks[]) => void;
}

const SubTasks: FC<IProps> = ({ tasks, type = "change", onChange }) => {
    const [currentEditSubTask, setCurrentEditSubTask] = useState<number | null>(
        null,
    );
    const [valueEditSubTask, setValueEditSubTask] = useState<string>("");

    const changeStatusSubTask = (index: number, value: boolean) => {
        tasks[index].status = value;

        sendSubTasks();
    };

    const deleteSubTask = (index: number) => {
        delete tasks[index];
        tasks = tasks.filter((item) => item);

        sendSubTasks();
    };

    const addSubTask = () => {
        const newSubTask: ISubTasks = {
            uid: uuidV4(),
            status: false,
            text: `Новая субзадача ${tasks.length}`,
        };

        tasks.push(newSubTask);

        sendSubTasks();
    };

    const closeEditSubTask = () => {
        tasks[currentEditSubTask as number].text = valueEditSubTask;

        sendSubTasks();

        setCurrentEditSubTask(null);
        setValueEditSubTask("");
    };

    const changeEditableSubTask = (index: number) => {
        setValueEditSubTask(tasks[index].text);
        setCurrentEditSubTask(index);
    };

    const sendSubTasks = () => {
        onChange(tasks);
    };

    return (
        <div className={styles.list}>
            <div className={styles.wrapper}>
                {tasks.map((item, index) => (
                    <div
                        key={item.uid + "subtask"}
                        className={styles.item}
                    >
                        {currentEditSubTask === null && type === "change" ? (
                            <div className={styles.events}>
                                <div
                                    className={styles.eventsItem}
                                    onClick={() => deleteSubTask(index)}
                                >
                                    <DeleteOutlined />
                                </div>
                                <div
                                    className={styles.eventsItem}
                                    onClick={() => changeEditableSubTask(index)}
                                >
                                    <EditOutlined />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className={styles.checkbox}>
                            {currentEditSubTask === index ? (
                                <div className={styles.rowEdit}>
                                    <Input
                                        value={valueEditSubTask}
                                        onChange={(e) =>
                                            setValueEditSubTask(e.target.value)
                                        }
                                    />
                                    <div className={styles.events}>
                                        <div
                                            className={styles.eventsItem}
                                            onClick={() =>
                                                setCurrentEditSubTask(null)
                                            }
                                        >
                                            <CloseOutlined />
                                        </div>
                                        <div
                                            className={styles.eventsItem}
                                            onClick={() => closeEditSubTask()}
                                        >
                                            <CheckOutlined />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Checkbox
                                    checked={item.status}
                                    onChange={(e) =>
                                        changeStatusSubTask(
                                            index,
                                            e.target.checked,
                                        )
                                    }
                                >
                                    {item.text}
                                </Checkbox>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {type === "change" && (
                <Button onClick={() => addSubTask()}>Добавить подзадачу</Button>
            )}
        </div>
    );
};

export default React.memo(SubTasks);
