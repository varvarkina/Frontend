import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { SelectionType } from "../../store/EditorType.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const SLIDE_WIDTH = 850
const SLIDE_HEIGHT = 460

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected?: boolean,
    className?: string,
    selection?: SelectionType
}

function Slide({slide, scale = 1, isSelected, className}: SlideProps) {
    const selection = useAppSelector((editor => editor.selection))
    const slideStyles:CSSProperties = {
        backgroundColor: slide.background.startsWith("#") ? slide.background : undefined, 
        backgroundImage: slide.background.startsWith("url(") ? slide.background : undefined,
        backgroundSize: `cover`,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }
    if (isSelected) {
        slideStyles.border = '3px solid #f4b467'
    }
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.objects.map(slideObject => {
                switch (slideObject.type) {
                    case "text":
                        return <TextObject 
                                    key={slideObject.id}
                                    textObject={slideObject} 
                                    isSelectedObj={slideObject.id == selection?.selectedObjId} 
                                    scale={scale}>  
                                </TextObject>
                    case "image":
                        return <ImageObject 
                                    key={slideObject.id} 
                                    imageObject={slideObject} 
                                    isSelectedObj={slideObject.id == selection?.selectedObjId} 
                                    scale={scale}>
                                </ImageObject>
                    default:
                        throw new Error(`Unknown slide type: ${slideObject}`)
                }
            })}
        </div>
    )
}

export {
    Slide
}