import { useAppSelector } from "./hooks/useAppSelector.ts";
import { useAppActions } from './hooks/useAppActions.ts';

import {Button} from "../components/button/Button.tsx";
import styles from './Workspace.module.css';
import DraggableItem from "./DraggableItem.tsx";

function Workspace() {
    const {addSlide, setSelection} = useAppActions()
    const slides = useAppSelector(editor => editor.presentation.slides)
    const selection = useAppSelector(editor => editor.selection)
    const selectedSlide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]

    function onWorkspaceClick() {
        setSelection({
            selectedSlideId: selectedSlide.id,
            selectedObjId: null,
        })
    }

    return (
        <div className={styles.workspace} onClick={onWorkspaceClick}>
            {selectedSlide ? (
                <>
                <DraggableItem slide={selectedSlide}/>
                </>
            ) : (
                <>
                <Button className={styles.noSlides} text={'Добавить новый слайд'} onClick={addSlide}></Button>
                </>
            )}
        </div>
    )
}

export {
    Workspace,
}