type PresentationType = {
    title: string,
    slides: Array<SlideType>
}

type SlideType = {
    id: string,
    objects: Array<SlideObject>,
    background: string
}

type SlideObject = TextObjectType | ImageObjectType

type BaseSlideObject = PositionType & SizeType & {
    id: string,
}

type TextObjectType = BaseSlideObject & {
    type: 'text',
    text: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string,
}

type ImageObjectType = BaseSlideObject & {
    type: 'image',
    src: string,
}

type PositionType = {
    x: number,
    y: number,
}

type SizeType = {
    width: number,
    height: number,
}

export type {
    PresentationType,
    SlideType,
    TextObjectType,
    ImageObjectType,
    SlideObject,
    PositionType,
    SizeType
}