import React, { FC } from "react";
import CardProject from "../../Card/CardProject/CardProject";
import { ICardProject } from "../../Card/CardProject/CardProject.interface";
import styles from "./CardsProject.module.scss";

interface IProps {
    items: ICardProject[];
}

const CardsProject: FC<IProps> = ({ items }) => {
    return (
        <div className={styles.row}>
            {items.map((item, index) => (
                <CardProject
                    key={item.uid + "cardProject"}
                    item={item}
                />
            ))}
        </div>
    );
};

export default React.memo(CardsProject);
