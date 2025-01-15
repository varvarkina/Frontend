import { Slide } from './slide/Slide.tsx';
import styles from './SlidesList.module.css';
import { useAppActions } from "./hooks/useAppActions.ts";
import { useAppSelector } from "./hooks/useAppSelector.ts";
import useSlideReorder from './hooks/useSlideReorder.ts';
import { useRef, useEffect } from 'react';

const SLIDE_PREVIEW_SCALE = 0.2

function getSlideWrapperClassName(slideId: string, selectedSlideId: string | undefined | null, isDragging: boolean): string {
    let className = styles.slideWrapper;
    if (isDragging) {
        className = `${className} ${styles.dragging}`;
    }
    if (slideId === selectedSlideId) {
        className = `${className} ${styles.selectedSlide}`;
    }
    return className;
}

function SlidesList() {
    const slides = useAppSelector(editor => editor.presentation.slides)
    const selection = useAppSelector(editor => editor.selection)
    const selectedSlideId = useAppSelector(editor => editor.selection?.selectedSlideId)
    const { handleMouseDown, isDragging } = useSlideReorder();

    const { setSelection } = useAppActions()

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
        })
    }

    const slideRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (selectedSlideId && slideRefs.current.has(selectedSlideId)) {
            const slideElement = slideRefs.current.get(selectedSlideId);
            slideElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedSlideId]);

    return (
        slides.length
            ?
            <div className={`${styles.slideList} slides-list`}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        ref={(el) => {
                            if (el) slideRefs.current.set(slide.id, el)
                        }}
                        onClick={() => onSlideClick(slide.id)}
                        onMouseDown={(e) => handleMouseDown(e, index)}
                        className={getSlideWrapperClassName(slide.id, selectedSlideId, isDragging)}
                    >
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={slide.id === selectedSlideId}
                            className={styles.item}
                            selection={selection}
                        />
                    </div>
                ))}
            </div>
            : (
                <div className={styles.noSlides}></div>
            )
    )
}

export {
    SlidesList,
}