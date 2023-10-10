import { TValidateType } from "./useValidate";

export enum EUseWidgets {
    projects = "projects",
    tasks = "tasks",
}

type TUseWidgetsTypes = keyof typeof EUseWidgets;
export type TWidgetsType<T extends TUseWidgetsTypes> = T extends "projects"
    ? "name" | "description"
    : "name" | "description" | "priority" | "subTasks" | "files";
export type TWidgetsWidgetType<T extends TUseWidgetsTypes> =
    T extends "projects"
        ? "input" | "textarea"
        : "input" | "checkbox" | "subTasks" | "files";

export interface IWidgetDefault<T extends TUseWidgetsTypes> {
    type: TWidgetsType<T>;
    widgetType: TWidgetsWidgetType<T>;
    content: {
        label: string;
        placeholder?: string;
    };
    validateType: TValidateType | "";
}

type TWidgets = {
    [K in TUseWidgetsTypes]: IWidgetDefault<K>[];
};

const widgets: TWidgets = {
    projects: [
        {
            type: "name",
            widgetType: "input",
            content: {
                label: "Название",
                placeholder: "Название проекта",
            },
            validateType: "length",
        },
        {
            type: "description",
            widgetType: "input",
            content: {
                label: "Описание",
                placeholder: "Описание проекта",
            },
            validateType: "",
        },
    ],
    tasks: [
        {
            type: "name",
            widgetType: "input",
            content: {
                label: "Название",
                placeholder: "Название задачи",
            },
            validateType: "length",
        },
        {
            type: "description",
            widgetType: "input",
            content: {
                label: "Описание",
                placeholder: "Описание задачи",
            },
            validateType: "",
        },
        {
            type: "priority",
            widgetType: "checkbox",
            content: {
                label: "Приоритетная ?",
            },
            validateType: "",
        },
        {
            type: "subTasks",
            widgetType: "subTasks",
            content: {
                label: "Подзадачи",
            },
            validateType: "",
        },
        {
            type: "files",
            widgetType: "files",
            content: {
                label: "Файлы",
            },
            validateType: "",
        },
    ],
};

function useWidgets<T extends keyof TWidgets>(type: T): TWidgets[T] {
    return widgets[type];
}

export default useWidgets;
