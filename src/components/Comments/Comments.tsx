import React, {FC, FormEvent, useMemo, useState} from 'react';
import styles from './Comments.module.scss'
import {IComment} from "./Comment.inerface";
import {useActions, useAppSelector} from "../../customHook/redux";
import {activeTaskGET, commentsItemsGET} from "../../redux/selectors/selectors";
import {TUid} from "../../types/helperTypes/helperTypes";
import {Input} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {v4 as uidV4} from "uuid";

interface IProps {
    root: TUid | null
}

const Comments: FC<IProps> = ({root}) => {

    const {
        addCommentACTION,
    } = useActions()

    const commentsItems = useAppSelector(commentsItemsGET)
    const activeTask = useAppSelector(activeTaskGET)

    const [activeAddComment, setActiveAddComment] = useState<TUid | null>(null)
    const [value, setValue] = useState<string>('')

    const items: IComment[] = useMemo(() => {
        return commentsItems.filter(it => it.parentUid === root && it.taskUid === activeTask.uid)
    }, [commentsItems])

    const addComment = (parentUid: TUid | null) => {
        const newComment: IComment = {
            uid: uidV4(),
            text: value,
            parentUid,
            taskUid: activeTask.uid,
            children: []
        }

        addCommentACTION(newComment)
        setValue('')
        setActiveAddComment(null)
    }

    return (
        <div className={styles.list}>
            {
                items.length > 0
                    ?
                    <>
                        {
                            items.map((item, index) => (
                                <React.Fragment
                                    key={item.uid + index + 'comment'}
                                >
                                    <div className={styles.item}>
                                        <div className={styles.name}>
                                            {
                                                item.uid
                                            }
                                        </div>
                                        <div className={styles.text}>
                                            {
                                                item.text
                                            }
                                        </div>
                                        <div
                                            className={styles.reply}
                                            onClick={() => {
                                                setActiveAddComment(item.uid)
                                            }}
                                        >
                                            Комментировать
                                        </div>
                                    </div>
                                    {
                                        activeAddComment === item.uid &&
                                        <div className={styles.addComment}>
                                            <Input
                                                value={value}
                                                onChange={(e) => {
                                                    setValue(e.target.value)
                                                }}
                                                placeholder="Написать"
                                            />
                                            <div className={styles.events}>
                                                <div
                                                    className={styles.eventsItem}
                                                    onClick={() => {
                                                        setActiveAddComment(null)
                                                    }}
                                                >
                                                    <CloseOutlined/>
                                                </div>
                                                <div
                                                    className={styles.eventsItem}
                                                    style={{
                                                        opacity: value ? 1 : 0.5,
                                                        pointerEvents: value ? 'visible' : 'none',
                                                    }}
                                                    onClick={() => addComment(item.uid)}
                                                >
                                                    <CheckOutlined/>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <Comments
                                        root={item.uid}
                                    />

                                </React.Fragment>
                            ))
                        }
                    </>
                    :
                    <>
                        {
                            root === null &&
                            <>
                                <div>
                                    Нету комментариев
                                </div>
                                <div className={styles.addComment}>
                                    <Input
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value)
                                        }}
                                        placeholder="Написать"
                                    />
                                    <div className={styles.events}>
                                        <div
                                            className={styles.eventsItem}
                                            style={{
                                                opacity: value ? 1 : 0.5,
                                                pointerEvents: value ? 'visible' : 'none',
                                            }}
                                            onClick={() => addComment(null)}
                                        >
                                            <CheckOutlined/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </>
            }
        </div>
    );
};

export default React.memo(Comments);