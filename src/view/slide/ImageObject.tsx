import {ImageObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
// import { useAppSelector } from "../hooks/useAppSelector.ts";
// import { useAppActions } from "../hooks/useAppActions.ts";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    isSelectedObj: boolean
}

function ImageObject({imageObject, scale = 1, isSelectedObj}: ImageObjectProps) {
    //const selectedSlideId = useAppSelector((editor => editor.selection?.selectedSlideId))
    // const {setSelection} = useAppActions()

    // function onObjectClick(event: React.MouseEvent, ObjectId: string) {
    //     event.stopPropagation();
    //     setSelection({
    //         selectedObjId: ObjectId,
    //         selectedSlideId: selectedSlideId || null,
    //     })
    // }
 
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.y * scale}px`,
        left: `${imageObject.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
    }
    if (isSelectedObj) {
        imageObjectStyles.border = '2px solid #0b57d0'
    }

    return (
        <img style={imageObjectStyles} src={imageObject.src} />//onClick={(event) => onObjectClick(event, imageObject.id)}/>
    )
}

export {
    ImageObject,
}