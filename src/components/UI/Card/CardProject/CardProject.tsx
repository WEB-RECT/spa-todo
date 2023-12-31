import { Row, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ICardProject } from "./CardProject.interface";
import styles from "./CardProject.module.scss";

interface IProps {
    item: ICardProject;
}

const CardProject: FC<IProps> = ({ item }) => {
    return (
        <Link
            to={`/${item.uid}`}
            className={styles.card}
        >
            <div className={styles.top}>
                <Row>
                    <Typography.Text strong={true}>{item.name}</Typography.Text>
                </Row>
                <Row>
                    <Typography.Text>{item.description}</Typography.Text>
                </Row>
            </div>
            <div className={styles.bottom}>
                <Typography.Text>Открыть</Typography.Text>
            </div>
        </Link>
    );
};

export default React.memo(CardProject);
