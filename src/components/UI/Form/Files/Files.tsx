import { CloseOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Files.module.scss";

export interface IFile extends File {
    preview: string;
}

interface IProps {
    value: IFile[];
    onChange: (files: IFile[]) => void;
}

const Files: FC<IProps> = ({ value, onChange }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            );
            value.push(...newFiles);

            sendFiles();
        },
    });

    const sendFiles = () => {
        onChange(value);
    };

    const deleteFile = (index: number) => {
        delete value[index];
        value = value.filter((file) => file);

        sendFiles();
    };

    return (
        <div className={styles.block}>
            <div
                {...getRootProps({
                    className: styles.dropzone,
                })}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div className={styles.files}>
                {value.map((file, index) => (
                    <div
                        key={file.name + index + "file"}
                        className={styles.file}
                    >
                        <div
                            className={styles.close}
                            onClick={() => deleteFile(index)}
                        >
                            <CloseOutlined />
                        </div>
                        <div className={styles.fileInner}>
                            <img src={file.preview} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Files);
