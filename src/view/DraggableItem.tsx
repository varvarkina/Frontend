import React, { CSSProperties } from 'react';
import { SlideObject, SlideType } from "../store/PresentationType.ts";
import useDragResize from './hooks/useDragAndDrop.ts';
import { useAppActions } from './hooks/useAppActions.ts';
import { useAppSelector } from './hooks/useAppSelector.ts'

const SLIDE_WIDTH = 850
const SLIDE_HEIGHT = 460

interface DraggableItemMainLogicProps {
    item: SlideObject;
    slideId: string;
    selectedItemId: string;
    slideToDisplay: SlideType | undefined;
    scale?: number
}

type DraggableItemProps = {
    slide: SlideType
    scale?: number;
    isSelected?: boolean;
    className?: string;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ slide, scale = 1, isSelected, className }) => {
    const slideToDisplay = useAppSelector(editor =>
        editor.presentation.slides.find(slide => slide.id === editor.selection?.selectedSlideId));
    const selectedItemId = useAppSelector(editor => editor.selection?.selectedObjId || '');
    const slideId = slideToDisplay?.id;

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background.startsWith("#") ? slide.background : undefined,
        backgroundImage: slide.background.startsWith("url(") ? slide.background : undefined,
        backgroundSize: "cover",
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: isSelected ? "3px solid #f4b467" : "1px solid #dadce0",
    };

    return (
        <div style={slideStyles} className={`${className}`}>
            {slideToDisplay?.objects.map((item) => (
                slideId && (
                    <DraggableItemMainLogic
                        key={item.id}
                        item={item}
                        slideId={slideId}
                        selectedItemId={selectedItemId}
                        slideToDisplay={slideToDisplay}
                        scale={scale}
                    />
                )
            ))}
        </div>
    );
};

const DraggableItemMainLogic: React.FC<DraggableItemMainLogicProps> =
    ({ item, slideId, selectedItemId, slideToDisplay, scale = 1 }) => {
        const { updateText, setSelection } = useAppActions();

        let isText: boolean;
        let isSelected: boolean = false;

        if (selectedItemId === item.id) {
            isSelected = true
        }

        if (item.type === "text") {
            isText = true;
        } else {
            isText = false;
        }

        const { position, size, handleMouseDown, handleResizeMouseDown } = useDragResize(
            isText,
            slideId,
            item.id,
            { x: item.x, y: item.y},
            {
                width: item.width,
                height: item.height
            },
            {
                minX: 0,
                maxX: window.innerWidth * 0.69,
                minY: 0,
                maxY: window.innerHeight * 0.77,
            },
        );

        const styles = {
            position: "absolute" as const,
            top: (position.y + 110) * scale ,
            left: (position.x + 244) * scale,
            zIndex: isSelected ? 9998 : 0,
            outline: isSelected ? "2px solid #00A1F1" : "none",
        };

        const handleTextChange = (event: React.FocusEvent<HTMLDivElement>, slideId: string, slideObjectId: string) => {
            const newText = event.target.innerText;
            updateText(slideId, slideObjectId, newText);
        };

        const getHighlight = (item: SlideObject) => {
            setSelection({selectedSlideId: slideId,
                selectedObjId: item.id
            });
        };

        // Стиль для точек изменения размера
        const resizeHandleStyle = {
            position: "absolute" as const,
            backgroundColor: "blue",
            width: "10px",
            height: "10px",
            cursor: "pointer",
            userSelect: "none" as "none",
            zIndex: 9999
        };

        // Визуализация точек на каждой стороне и в углах
        const resizeHandles = [
            { top: - 5, left: -5 }, // top-left
            { top: - 5, left: size.width - 5 }, // top-right
            { top: size.height - 5, left: - 5 }, // bottom-left
            { top: size.height - 5, left: size.width - 5 }, // bottom-right
            { top: size.height / 2 - 5, left: - 5 }, // left
            { top: size.height / 2 - 5, left: size.width - 5 }, // middle-right
            { top: - 5, left: size.width / 2 - 5 }, // middle-top
            { top: size.height - 5, left: size.width / 2 - 5 }, // middle-bottom
        ];

        return (
            <>
                {item.type === "text" ? (
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                            ...styles,
                            fontSize: item.fontSize * scale,
                            fontFamily: item.fontFamily,
                            background: "transparent",
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            width: size.width * scale,
                            height: size.height * scale,
                        }}
                        onBlur={(e) => handleTextChange(e, slideToDisplay!.id, item.id)}
                        onClick={(e) => {
                            e.stopPropagation();
                            getHighlight(item);
                        }}
                        onMouseDown={handleMouseDown}
                    >
                        {item.text}
                    </div>
                ) : item.type === "image" ? (
                    <img
                        src={item.src}
                        alt="slide image"
                        style={{
                            ...styles,
                            width: size.width * scale,
                            height: size.height * scale,
                            background: "transparent",
                            userSelect: "none"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            getHighlight(item);
                        }}
                        onMouseDown={handleMouseDown}
                    />
                ) : null}
                {isSelected && resizeHandles.map((handle, index) => {
                    const directions = [
                        "top-left", "top-right", "bottom-left", "bottom-right",
                        "left", "right", "top", "bottom"
                    ];

                    const direction = directions[index];

                    return (
                        <div
                            key={index}
                            style={{
                                ...resizeHandleStyle,
                                top: position.y + handle.top + 110,
                                left: position.x + handle.left + 244,
                            }}
                            onMouseDown={(e) => handleResizeMouseDown(direction, e)}
                        />
                    );
                })}
            </>
        );
    };

export default DraggableItem;
