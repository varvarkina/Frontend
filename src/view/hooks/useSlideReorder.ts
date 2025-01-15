import { useState, useEffect } from "react";
import { useAppActions } from "./useAppActions";

const useSlideReorder = (/*slideId: string*/) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(null);

    const { reorderSlides } = useAppActions();

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && currentSlideIndex !== null) {
            const slidesListElement = document.querySelector(".slides-list");
            if (!slidesListElement) return;

            const slideElements = Array.from(slidesListElement.children) as HTMLElement[];
            slideElements.forEach((element, targetIndex) => {
                const rect = element.getBoundingClientRect();
                if (
                    e.clientY > rect.top &&
                    e.clientY < rect.bottom &&
                    targetIndex !== currentSlideIndex
                ) {
                    reorderSlides(currentSlideIndex, targetIndex);
                    setCurrentSlideIndex(targetIndex); 
                }
            });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            setCurrentSlideIndex(null);
        }
    };

    const handleMouseDown = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        setIsDragging(true);
        setCurrentSlideIndex(index);
        setStartDragPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, currentSlideIndex]);

    return { handleMouseDown, isDragging };
};

export default useSlideReorder;
