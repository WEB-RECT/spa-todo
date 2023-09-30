import React, {useState} from 'react';
import Container from "../components/UI/Layout/Container/Container";
import {Button, Input, Modal, Row, Typography} from "antd";
import styles from "../styles/pages/projects.module.scss"
import {ICardProject} from "../components/UI/Card/CardProject/CardProject.interface";
import {v4 as uuid4} from 'uuid';
import CardsProject from "../components/UI/Cards/CardsProject/CardsProject";
import {newData} from "../helpers/newData";
import useValidate, {EValidateType, TValidateType} from "../customHook/useValidate";
import {useActions, useAppSelector} from "../customHook/redux";
import {projectsItemsGET} from "../redux/selectors/selectors";
import FormItem from "../components/UI/Form/FormItem/FormItem";
import useWidgets, {EUseWidgets, TWidgetsType} from "../customHook/useWidgets";
import {Helmet} from "react-helmet";

type TWidgetsTypeProjects = TWidgetsType<EUseWidgets.projects>
type TWidgetValue = {
    [K in TWidgetsTypeProjects]: {
        value: any | any[]
    }
}

const needValidate = ['name', 'description']

const Projects = () => {

    const {
        addProjectACTION
    } = useActions()

    const widgets = useWidgets<EUseWidgets.projects>(EUseWidgets.projects)

    const projectsItems = useAppSelector(projectsItemsGET)

    const [resultValidate, setResultValidate, clearValidateValue] = useValidate(needValidate)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [widgetValue, setWidgetValue] = useState<TWidgetValue>({} as TWidgetValue)

    const createProject = () => {
        const project: ICardProject = {
            uid: uuid4(),
            dateCreate: Date.now(),
        } as ICardProject

        (Object.keys(widgetValue) as Array<TWidgetsTypeProjects>).forEach((key: TWidgetsTypeProjects) => {
            project[key] = widgetValue[key].value
        })

        addProjectACTION(project)

        showModal()
        setWidgetValue({} as TWidgetValue)
        clearValidateValue()
    }

    const showModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const changeValueWidget = (type: TWidgetsTypeProjects, value: string) => {

        let currentValidateType: TValidateType = 'length'

        setResultValidate({
            validateType: currentValidateType,
            type,
            value,
        })

        setWidgetValue(prev => {
            const currentPrev = newData<TWidgetValue>(prev)
            currentPrev[type] = {
                ...currentPrev[type],
                value: value
            }

            return currentPrev
        })
    }

    return (
        <>
            <Helmet>
                <title>
                    Проекты
                </title>
            </Helmet>
            <div className={styles.section}>
                <Container>
                    <Row
                        justify="space-between"
                        align="middle"
                    >
                        <Typography.Title
                            level={3}
                        >
                            Проекты
                        </Typography.Title>
                        <Button
                            type="primary"
                            onClick={() => showModal()}
                        >
                            Создать проект
                        </Button>
                    </Row>

                    {
                        projectsItems.length > 0
                            ?
                            <CardsProject
                                items={projectsItems}
                            />
                            :
                            <Row
                                justify="center"
                            >
                                <Typography.Title
                                    level={2}
                                >
                                    Нету проектов
                                </Typography.Title>
                            </Row>
                    }
                </Container>

                <Modal
                    title="Создание проекта"
                    okText="Создать проект"
                    cancelText="Отменить создание"
                    open={isModalOpen}
                    onOk={createProject}
                    onCancel={showModal}
                    okButtonProps={{
                        disabled: !resultValidate.allValidated
                    }}
                >
                    {
                        widgets.map((widget) => (
                            <React.Fragment
                                key={widget.type + widget.widgetType + 'создание'}
                            >
                                {
                                    (widget.widgetType === 'input')
                                        ?
                                        <FormItem
                                            label={widget.content.label}
                                        >
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
                                        </FormItem>
                                        :
                                        ''
                                }
                            </React.Fragment>
                        ))
                    }
                </Modal>
            </div>
        </>
    );
};

export default React.memo(Projects);