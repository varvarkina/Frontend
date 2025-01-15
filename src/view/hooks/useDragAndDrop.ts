import { useState, useEffect } from "react";
import { PositionType, SizeType } from "../../store/PresentationType";
import { useAppActions } from './useAppActions';
import { useAppSelector } from "./useAppSelector";

const useDragResize = (
    isText: boolean,
    slideId: string,
    contentId: string,
    initialPosition: PositionType,
    initialSize: SizeType,
    boundaries?: { minX: number; maxX: number; minY: number; maxY: number },
) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);

    const { updateContentPosition, updateContentSize } = useAppActions();

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            let newX = e.clientX - startDragPosition.x;
            let newY = e.clientY - startDragPosition.y;

            if (boundaries) {
                newX = Math.min(Math.max(newX, boundaries.minX), boundaries.maxX - size.width);
                newY = Math.min(Math.max(newY, boundaries.minY), boundaries.maxY - size.height);
            }

            setPosition({ x: newX, y: newY });
        } else if (isResizing && resizeDirection) {

            const newSize = { ...size };
            const newPosition = { ...position };
            const deltaX = e.clientX - startDragPosition.x;
            const deltaY = e.clientY - startDragPosition.y;
            console.log(resizeDirection)

            switch (resizeDirection) {
                case "right":
                    newSize.width = Math.max(20, size.width + deltaX);
                    console.log(e.clientX, startDragPosition.x, "delta:", deltaX, 'size:', size.width, size.width + deltaX) //!!!
                    break;
                case "bottom":
                    newSize.height = Math.max(20, size.height + deltaY);
                    break;
                case "left":
                    newSize.width = Math.max(20, size.width - deltaX);
                    if (newSize.width !== size.width) {
                        newPosition.x = position.x + deltaX;
                    }
                    break;
                case "top":
                    newSize.height = Math.max(20, size.height - deltaY);
                    if (newSize.height !== size.height) {
                        newPosition.y = position.y + deltaY;
                    }
                    break;
                case "top-right":
                    newSize.width = Math.max(20, size.width + deltaX);
                    newSize.height = Math.max(20, size.height - deltaY);
                    if (newSize.height !== size.height) {
                        newPosition.y = position.y + deltaY;
                    }
                    break;
                case "top-left":
                    newSize.width = Math.max(20, size.width - deltaX);
                    newSize.height = Math.max(20, size.height - deltaY);
                    if (newSize.width !== size.width) {
                        newPosition.x = position.x + deltaX;
                    }
                    if (newSize.height !== size.height) {
                        newPosition.y = position.y + deltaY;
                    }
                    break;
                case "bottom-right":
                    newSize.width = Math.max(20, size.width + deltaX);
                    newSize.height = Math.max(20, size.height + deltaY);
                    break;
                case "bottom-left":
                    newSize.width = Math.max(20, size.width - deltaX);
                    newSize.height = Math.max(20, size.height + deltaY);
                    if (newSize.width !== size.width) {
                        newPosition.x = position.x + deltaX;
                    }
                    break;
                default:
                    break;
            }

            if (boundaries) {
                newSize.width = Math.min(newSize.width, boundaries.maxX - newPosition.x);
                newSize.height = Math.min(newSize.height, boundaries.maxY - newPosition.y);

                newPosition.x = Math.max(boundaries.minX, Math.min(newPosition.x, boundaries.maxX - newSize.width));
                newPosition.y = Math.max(boundaries.minY, Math.min(newPosition.y, boundaries.maxY - newSize.height));
            }

            setSize(newSize);
            setPosition(newPosition);
            setStartDragPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            updateContentPosition(slideId, contentId, position);
        } else if (isResizing) {
            setIsResizing(false);
            updateContentSize(slideId, contentId, size);
            updateContentPosition(slideId, contentId, position)
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isText) {
            e.preventDefault();
        }
        setIsDragging(true);
        setStartDragPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        setStartDragPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing, position, size, resizeDirection]);

    const currentSlide = useAppSelector(state => state.presentation.slides.find(slide => slide.id === slideId));
    const currentItem = currentSlide?.objects.find(content => content.id === contentId);

    useEffect(() => {
        if (currentItem?.x !== undefined && currentItem?.y !== undefined) {
            setPosition({ x: currentItem.x, y: currentItem.y });
        }

        if (currentItem?.width !== undefined && currentItem?.height !== undefined) {
            setSize({ width: currentItem.width, height: currentItem.height });
        }
    }, [currentItem]);

    return { position, size, handleMouseDown, handleResizeMouseDown };
};

export default useDragResize;
