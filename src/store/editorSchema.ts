import Ajv from 'ajv';

export const ajv = new Ajv();

export const editorSchema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                title: { type: "string" },
                slides: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            background: { type: "string" },
                            objects: {
                                type: "array",
                                items: {
                                    type: "object",
                                    oneOf: [
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                x: { type: "number" },
                                                y: { type: "number" },
                                                width: { type: "number" },
                                                height: { type: "number" },
                                                type: { type: "string", const: "text" },
                                                text: { type: "string" },
                                                fontFamily: { type: "string" },
                                                fontSize: { type: "number" },
                                                fontColor: { type: "string" },
                                            },
                                            required: [
                                                "id",
                                                "x",
                                                "y",
                                                // "width",
                                                // "height",
                                                "type",
                                                "text",
                                                "fontFamily",
                                                "fontSize",
                                                "fontColor",
                                            ],
                                            additionalProperties: true,
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                x: { type: "number" },
                                                y: { type: "number" },
                                                width: { type: "number" },
                                                height: { type: "number" },
                                                type: { type: "string", const: "image" },
                                                src: { type: "string" },
                                            },
                                            required: [
                                                "id",
                                                "x",
                                                "y",
                                                "width",
                                                "height",
                                                "type",
                                                "src",
                                            ],
                                            additionalProperties: false,
                                        },
                                    ],
                                },
                            },
                        },
                        required: ["id", "background", "objects"],
                        additionalProperties: false,
                    },
                },
            },
            required: ["title", "slides"],
            additionalProperties: false,
        },
        selection: {
            type: "object",
            properties: {
                selectedSlideId: { type: ["string", "null"] },
                selectedObjId: { type: ["string", "null"], nullable: true },
            },
            required: ["selectedSlideId"],
            additionalProperties: false,
        },
    },
    required: ["presentation", "selection"],
    additionalProperties: false,
};
