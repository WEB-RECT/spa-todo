import React, {FC, ReactNode} from 'react';
import styles from "./FormItem.module.scss"

interface IProps {
    label: string
    children: ReactNode
}

const FormItem: FC<IProps> = ({ label, children }) => {
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                {
                    label
                }
            </div>
            {
                children
            }
        </div>
    );
};

export default React.memo(FormItem);