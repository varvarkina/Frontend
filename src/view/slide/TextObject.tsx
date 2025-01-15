import {TextObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
// import { useAppSelector } from "../hooks/useAppSelector.ts";
// import { useAppActions } from "../hooks/useAppActions.ts";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    isSelectedObj: boolean
}
function TextObject({textObject, isSelectedObj, scale = 1}: TextObjectProps) {

    // const selectedSlideId = useAppSelector((editor => editor.selection?.selectedSlideId))
    // const {setSelection} = useAppActions()

    // function onObjectClick(event: React.MouseEvent, ObjectId: string) {
    //     event.stopPropagation();
    //     setSelection({
    //         selectedObjId: ObjectId,
    //         selectedSlideId: selectedSlideId || null,
    //     })
    // }
    // const onTextChange: React.ChangeEventHandler = (event) => {
    //     dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    // }
    
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`,
        left: `${textObject.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`
    }
    if (isSelectedObj) {
        textObjectStyles.border = '2px solid #0b57d0'
    }
    
    return (
        <p style={textObjectStyles}>{textObject.text}</p> //onClick={(event) => onObjectClick(event, textObject.id)}
        //<input style={textObjectStyles} type="text" defaultValue={textObject.text} onClick={() => onObjectClick(textObject.id)} onDoubleClick={}/>
    )
}

export {
    TextObject,
}