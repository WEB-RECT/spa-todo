import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from "../styles/pages/tasks.module.scss"
import {Button, Checkbox, Form, Input, Modal, Row, Typography} from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import {TUnixDate, TUid} from "../types/helperTypes/helperTypes";
import {v4 as uuidV4} from "uuid";
import useValidate, {TValidateType} from "../customHook/useValidate";
import {newData} from "../helpers/newData";
import FormItem from "../components/UI/Form/FormItem/FormItem";
import Files from "../components/UI/Form/Files/Files";
import SubTasks from "../components/UI/SubTasks/SubTasks";
import {activeTaskGET, editTaskGET, projectsItemsGET, tasksItemsGET} from "../redux/selectors/selectors";
import {useActions, useAppSelector} from "../customHook/redux";
import {ICardTask, TCardTaskStatus} from "../components/UI/Card/CardTask/CardTask.interface";
import ColTasks from "../components/UI/Cards/ColTasks/ColTasks";
import useWidgets, {EUseWidgets, TWidgetsType} from "../customHook/useWidgets";
import CardTaskOpened from "../components/UI/Card/CardTaskOpened/CardTaskOpened";
import { Editor } from '@tinymce/tinymce-react';
import {Helmet} from "react-helmet";
import {useDrop} from "react-dnd";

export interface IColTasksData {
    name: TCardTaskStatus
    uid: TUid
}

type TWidgetsTypeTasks = TWidgetsType<EUseWidgets.tasks>
type TWidgetValue = {
    [K in TWidgetsTypeTasks]: {
        value: any | any[]
    }
}

interface IIsEditCardTask {
    status: boolean
    cardTask: ICardTask
}

export const colTasks: IColTasksData[] = [
    {
        name: "Queue",
        uid: '111'
    },
    {
        name: "Development",
        uid: '222'
    },
    {
        name: "Done",
        uid: '333'
    },
]

const Tasks = () => {

    const {uid: paramsUid} = useParams()
    const navigate = useNavigate()

    const {
        addTasksACTION,
        changeActiveTaskACTION,
        editTaskACTION,
        updateTaskACTION,
    } = useActions()

    const widgets = useWidgets<EUseWidgets.tasks>(EUseWidgets.tasks)
    const needValidate: TWidgetsTypeTasks[] = widgets.reduce<TWidgetsTypeTasks[]>((acc, item) => {
        if (item.validateType) {
            acc.push(item.type)
        }

        return acc
    }, [])

    const [
        resultValidate,
        setResultValidate,
        clearValidateValue
    ] = useValidate(needValidate)

    const tasksItems = useAppSelector(tasksItemsGET)
    const activeTask = useAppSelector(activeTaskGET)
    const projectsItems = useAppSelector(projectsItemsGET)
    const editTask = useAppSelector(editTaskGET)

    const [colTasksData, setColTasksData] = useState<IColTasksData[]>(colTasks)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalOpenVisibleCard, setIsModalOpenVisibleCard] = useState<boolean>(false)
    const [widgetValue, setWidgetValue] = useState<TWidgetValue>({} as TWidgetValue)
    const [currentParamsUid, setCurrentParamsUid] = useState<TUid>('')
    const [isEditCardTask, setIsEditCardTask] = useState<IIsEditCardTask>({} as IIsEditCardTask)
    const [valueFind, setValueFind] = useState<string>('')

    const editorRef = useRef<any>(null)

    // проверка проекта
    useLayoutEffect(() => {
        if (paramsUid) {
            const check = projectsItems.find(item => item.uid === paramsUid)
            if (check) {
                setCurrentParamsUid(paramsUid)
            } else {
                setCurrentParamsUid('')
                setTimeout(() => {
                    navigate('/')
                }, 0)
            }
        } else {
            setTimeout(() => {
                navigate('/')
            }, 0)
        }
    }, [paramsUid])

    // включение редактировании карточки
    useEffect(() => {
        if (editTask) {
            setIsEditCardTask({
                status: true,
                cardTask: editTask
            })

            const currentWidgetValue: TWidgetValue = {} as TWidgetValue;

            (Object.keys(editTask) as Array<keyof ICardTask>).forEach((key) => {
                if (
                    key === "name"
                    || key === "description"
                    || key === "priority"
                    || key === "subTasks"
                    || key === "files"
                ) {
                    currentWidgetValue[key] = {
                        value: editTask[key]
                    }
                }
                if (needValidate.find(it => it === key)) {
                    let currentValidateType: TValidateType = 'length'

                    setResultValidate({
                        validateType: currentValidateType,
                        type: key,
                        value: editTask[key],
                    })
                }
            })

            setWidgetValue(currentWidgetValue)
            setIsModalOpen(true)
        }
    }, [editTask])

    // при клике на карточку появляется модалка
    useEffect(() => {
        if (activeTask) {
            setIsModalOpenVisibleCard(true)
        }
    }, [activeTask])

    const showModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setWidgetValue({} as TWidgetValue)
        clearValidateValue()
    }

    const closeUpdate = () => {
        setIsModalOpen(false)
        setWidgetValue({} as TWidgetValue)
        editTaskACTION(null)
        clearValidateValue()
        setIsEditCardTask({} as IIsEditCardTask)
    }

    const closeVisibleModal = () => {
        changeActiveTaskACTION(null)
        setIsModalOpenVisibleCard(false)
    }

    const changeValueWidget = (type: TWidgetsTypeTasks, value: any) => {

        if (needValidate.find((it) => it === type)) {
            let currentValidateType: TValidateType = 'length'

            setResultValidate({
                validateType: currentValidateType,
                type,
                value,
            })
        }

        setWidgetValue(prev => {
            const currentPrev = newData<TWidgetValue>(prev)
            currentPrev[type] = {
                ...currentPrev[type],
                value: value
            }

            return currentPrev
        })
    }

    const createTask = () => {
        const task: ICardTask = {
            id: tasksItems.length,
            date: {
                create: Date.now(),
                work: null,
                end: null,
            },
            projectUid: currentParamsUid as TUid,
            colTasksUid: colTasksData[0].uid,
            status: colTasksData[0].name,
            uid: uuidV4(),
            files: [],
            subTasks: [],
            priority: false,
            name: '',
            description: '',
        };

        (Object.keys(widgetValue) as Array<TWidgetsTypeTasks>).forEach((key) => {
            if (key === 'description') {
                (task[key] as any) = editorRef.current.getContent()
            } else {
                (task[key] as any) = widgetValue[key].value
            }
        })


        addTasksACTION(task)
        setWidgetValue({} as TWidgetValue)
        showModal()
        clearValidateValue()
    }
    const updateTask = () => {
        const currentTask: ICardTask = {
            ...isEditCardTask.cardTask
        };

        (Object.keys(widgetValue) as Array<TWidgetsTypeTasks>).forEach((key) => {
            if (key === 'description') {
                (currentTask[key] as any) = editorRef.current.getContent()
            } else {
                (currentTask[key] as any) = widgetValue[key].value
            }
        })

        updateTaskACTION(currentTask)

        closeUpdate()
    }

    return (
        <>
            <Helmet>
                <title>
                    Задачи
                </title>
            </Helmet>
            <div className={styles.section}>
                <Sidebar
                    title="Проекты"
                    activeUid={currentParamsUid}
                />
                <div className={styles.content}>
                    <div className={styles.contentTop}>
                        <div className={styles.contentTopInfo}>
                            <Typography.Title
                                level={3}
                            >
                                Задачи
                            </Typography.Title>
                            <Input
                                className={styles.contentTopInfoInput}
                                placeholder="Найти задачу по id или названию"
                                value={valueFind}
                                onChange={(e) => setValueFind(e.target.value)}
                            />
                            <div className={styles.button}>
                                <Button
                                    type="primary"
                                    onClick={showModal}
                                >
                                    Создать задачу
                                </Button>
                            </div>
                        </div>

                    </div>
                    <div className={styles.contentBlock}>
                        {
                            colTasksData.map((item) => (
                                <ColTasks
                                    key={item.uid + 'tasks-col'}
                                    item={item}
                                    tasksItems={tasksItems}
                                    currentParamsUid={currentParamsUid}
                                    valueFind={valueFind}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* просмотр карточки */}
            {
                activeTask &&
                <Modal
                    title={`${activeTask.priority ? '🔥' : ''} ${activeTask.name}`}
                    okText=""
                    cancelText=""
                    open={isModalOpenVisibleCard}
                    onOk={createTask}
                    onCancel={closeVisibleModal}
                    footer={null}
                >
                    <CardTaskOpened
                        activeTask={activeTask}
                    />
                </Modal>
            }

            {/* редактирование/создание */}
            <Modal
                title={isEditCardTask.status ? "Редактирование карточки" : "Создание задачи"}
                okText={isEditCardTask.status ? "Обновить карточку" : "Создать задачу"}
                cancelText="Отменить"
                open={isModalOpen}
                onOk={isEditCardTask.status ? updateTask : createTask}
                onCancel={isEditCardTask.status ? closeUpdate : closeModal}
                okButtonProps={{
                    disabled: !resultValidate.allValidated
                }}
            >
                {
                    widgets.map((widget) => (
                        <React.Fragment
                            key={widget.type + widget.widgetType + 'создание'}
                        >
                            <FormItem
                                label={widget.content.label}
                            >
                                {
                                    (widget.type === 'name')
                                        ?
                                        <Input
                                            status={
                                                resultValidate.list.hasOwnProperty(widget.type)
                                                    ?
                                                    !resultValidate.list[widget.type].status ? 'error' : undefined
                                                    :
                                                    undefined
                                            }
                                            className={styles.input}
                                            placeholder={widget.content.placeholder}
                                            value={widgetValue[widget.type]?.value || ''}
                                            onChange={(e) => {
                                                changeValueWidget(widget.type, e.target.value)
                                            }}
                                        />
                                        :
                                        ''
                                }
                                {
                                    (widget.type === 'description')
                                        ?
                                        <Editor
                                            apiKey={process.env.REACT_APP_TINY_API}
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={widgetValue[widget.type]?.value || ''}
                                            init={{
                                                height: 300,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                        :
                                        ''
                                }
                                {
                                    (widget.widgetType === 'checkbox')
                                        ?
                                        <Checkbox
                                            checked={widgetValue[widget.type]?.value || false}
                                            onChange={(e) => {
                                                changeValueWidget(widget.type, e.target.checked)
                                            }}
                                        >
                                            {
                                                widgetValue[widget.type]?.value ? 'Да' : 'Нет'
                                            }
                                        </Checkbox>
                                        :
                                        ''
                                }
                                {
                                    (widget.widgetType === 'subTasks')
                                        ?
                                        <SubTasks
                                            tasks={widgetValue[widget.type]?.value || []}
                                            onChange={(subTasks) => {
                                                changeValueWidget(widget.type, subTasks)
                                            }}
                                        />
                                        :
                                        ''
                                }
                                {
                                    (widget.widgetType === 'files')
                                        ?
                                        <Files
                                            value={widgetValue[widget.type]?.value || []}
                                            onChange={(files) => {
                                                changeValueWidget(widget.type, files)
                                            }}
                                        />
                                        :
                                        ''
                                }
                            </FormItem>
                        </React.Fragment>
                    ))
                }
            </Modal>
        </>
    );
};

export default React.memo(Tasks);