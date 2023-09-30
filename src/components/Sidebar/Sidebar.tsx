import React, {FC} from 'react';
import styles from "./Sidebar.module.scss"
import {Button, Row, Typography} from "antd";
import {useAppSelector} from "../../customHook/redux";
import {projectsItemsGET} from "../../redux/selectors/selectors";
import {TUid} from "../../types/helperTypes/helperTypes";
import classNames from "classnames";
import {Link} from "react-router-dom";

interface IProps {
    title: string
    activeUid: TUid | undefined
}

const Sidebar: FC<IProps> = ({title, activeUid }) => {

    const projectsItems = useAppSelector(projectsItemsGET)

    return (
        <div className={styles.sidebar}>
            <Row
                justify="space-between"
            >
                <Typography.Title
                    level={3}
                >
                    {
                        title
                    }
                </Typography.Title>
                <Link to="/">
                    <Button>
                        Вернуться
                    </Button>
                </Link>
            </Row>
            <div className={styles.items}>
                {
                    projectsItems.map((item) => (
                        <Link
                            key={item.uid + 'sidebar'}
                            to={`/${item.uid}`}
                        >
                            <div
                                className={classNames(styles.item, {
                                    [styles.active]: item.uid === activeUid
                                })}
                            >
                                {
                                    item.name
                                }
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(Sidebar);