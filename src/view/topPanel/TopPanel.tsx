import styles from './TopPanel.module.css'
import stylesIcon from '../../components/IconButton/IconButton.module.css'
import * as React from "react";

import plusSrc from "../../assets/icons/plus2.png";
import bin from "../../assets/icons/delete2.png";
import gallery from "../../assets/icons/gallery7.png";
import text from "../../assets/icons/text4.png";
import cross from "../../assets/icons/cross.png";

import { Button } from "../../components/button/Button.tsx";
import IconButton from '../../components/IconButton/IconButton.tsx';
import FileUpload from '../../components/fileUpload/FileUpload.tsx';

import { useState } from "react";
import { useAppActions } from '../hooks/useAppActions.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { exportToJson } from '../../store/exportToJson.ts';
import { useImportFromJson } from '../../store/importFromJson.ts';
import { HistoryContext } from '../hooks/historyContext.ts';
import { exportToPdf } from '../../store/exportToPdf.ts';

function TopPanel() {
    const [colorVisible, setColor] = useState(false)
    const [background, setBackground] = useState("#ffe4c4");
    const [fileName, setFileName] = useState('');

    const editor = useAppSelector(state => state)
    const title = useAppSelector((editor => editor.presentation.title))
    const selectedObjId = useAppSelector((editor => editor.selection?.selectedObjId))

    const { addSlide, removeSlide, renamePresentation, addObject, removeObject, changeBackground,
        setEditor } = useAppActions()
    const importFromJson = useImportFromJson();
    //const editor = getEditor();

    const history = React.useContext(HistoryContext)

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onAddText() {
        addObject({
            type: "text", text: "new text", fontFamily: "Oxygen", fontSize: 14, fontColor: "A1A1A1", x: 50, y: 40,
            id: '',
            width: 54,
            height: 18
        })
    }

    const onAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            if (file.type.match('image.*')) {
                if (file.size <= 3 * 1024 * 1024) { // 3 МБ в байтах
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                        if (e.target && e.target.result) {
                            const img = new Image();
                            img.src = e.target.result.toString();

                            img.onload = () => {
                                const aspectRatio = img.width / img.height;

                                const desiredHeight = 200;
                                const desiredWidth = desiredHeight * aspectRatio;

                                addObject({
                                    type: 'image',
                                    src: img.src,
                                    x: 150,
                                    y: 40,
                                    width: desiredWidth,
                                    height: desiredHeight,
                                    id: ''
                                });
                            };
                        }
                    };
                } else {
                    alert("Файл слишком большой! Пожалуйста, выберите изображение размером меньше 3 МБ.");
                }
            }
            else {
                alert("It's not an image!");
            }
        }
    };

    function onBackgroundChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newColor = event.target.value;
        setColor(true)
        setBackground(newColor);
    }

    function onBackgroundSave() {
        changeBackground(background)
        setColor(false)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value)
    }

    function onExportClick() {
        exportToJson(editor)
    }

    function onExportPdfClick() {
        exportToPdf(editor)
    }  

    const onImportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFileName(file.name);
        }
        importFromJson(event);
    };

    const onBackgrondImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            if (file.type.match('image.*')) {
                if (file.size <= 3 * 1024 * 1024) { // 3 МБ в байтах
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = (e) => {
                        if (e.target && e.target.result) {
                            const dataUrl = e.target.result.toString(); 

                            const img = new Image();
                            img.src = dataUrl;

                            img.onload = () => {
                                setBackground(`url(${dataUrl})`); 
                                changeBackground(`url(${dataUrl})`);
                            };
                        }
                    };

                    reader.onerror = () => {
                        console.error("Error reading the file.");
                        alert("Failed to load image.");
                    };
                } else {
                    alert("Файл слишком большой! Пожалуйста, выберите изображение размером меньше 3 МБ.");
                }
            } else {
                alert("Please select a valid image file.");
            }
        }
    };


    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" value={title} onChange={onTitleChange} maxLength={28} />
            <div className={styles.container}>
                <IconButton className={styles.button} src={plusSrc} alt="Add Slide" title={"Add slide"} label={""} onClick={addSlide}></IconButton>
                <IconButton className={styles.button} src={bin} alt="Remove Slide" title={"Remove slide"} label={""} onClick={removeSlide}></IconButton>
                <Button className={styles.button} text={'Undo'} onClick={onUndo}></Button>
                <Button className={styles.button} text={'Redo'} onClick={onRedo}></Button>
                <IconButton className={styles.button} src={text} alt="Add text" title={"Add text"} label={""} onClick={onAddText}></IconButton>
                <FileUpload onFileChange={onAddImage} labelContent={<img src={gallery} className={stylesIcon.icon} alt="Add picture" />} />
                {selectedObjId &&
                    <IconButton className={styles.cross} src={cross} alt="Remove Object" title={"Remove Object"} label={"Удалить"} onClick={removeObject}></IconButton>
                }
                <input
                    className={`${styles.background} ${styles.button}`}
                    type="color"
                    value={background}
                    title={"Change background color"}
                    onChange={onBackgroundChange}
                />
                {colorVisible &&
                    <Button className={styles.button} text={'Ок'} onClick={onBackgroundSave}></Button>
                }
                <FileUpload onFileChange={onBackgrondImageChange} labelContent="Фон" className={styles.input} />
                <Button className={styles.button} text={'Экспорт'} onClick={onExportClick}></Button>
                <Button className={styles.button} text={'Экспорт в pdf'} onClick={onExportPdfClick}></Button>
                <FileUpload onFileChange={onImportChange} labelContent={<span >Импорт</span>} className={styles.input} />
                {fileName && <p className={styles.import}>{fileName}</p>}
            </div>
        </div>
    )
}

export {
    TopPanel,
}

