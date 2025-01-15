import React, { useId, ReactNode } from 'react';
import styles from './FileUpload.module.css';

type FileUploadProps = {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    labelContent?: ReactNode;
    className?: string;
};

const FileUpload = ({ onFileChange, labelContent = "", className }: FileUploadProps) => {
    const id = useId(); 

    return (
        <div className={`${styles.button} `}>
            <label htmlFor={id} className={` ${className || ''}`}>
                {labelContent } 
            </label>
            <input
                type="file"
                id={id}
                className={styles.hidden}
                onChange={onFileChange}
            />
        </div>
    );
};

export default FileUpload;

