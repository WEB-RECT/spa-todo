import React, { FC, ReactNode } from "react";
import styles from "./Container.module.scss";

interface IProps {
    children: ReactNode;
}

const Container: FC<IProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default React.memo(Container);
