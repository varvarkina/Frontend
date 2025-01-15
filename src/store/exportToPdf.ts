import jsPDF from "jspdf";
import { EditorType } from "./EditorType";
import { SlideObject, SlideType } from "./PresentationType";

const optimizeImage = async (base64: string) => {
    const img = new Image();
    img.src = base64;
    console.log("optimizeImage", img.src)
    return new Promise<string>((resolve) => {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const width = img.width * 0.5;
            const height = img.height * 0.5;

            canvas.width = width;
            canvas.height = height;

            ctx?.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL("image/jpeg", 0.7)); 
        };
    });
};

export const exportToPdf = (editor: EditorType) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1123, 794],
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const slides = editor.presentation.slides;

    slides.forEach(async (slide: SlideType, index: number) => {
        if (index !== 0) {
            doc.addPage();
        }

        if (slide.background.startsWith("#") || slide.background.startsWith("rgb")) {
            doc.setFillColor(slide.background);
            doc.rect(0, 0, pageWidth, pageHeight, "F");
        } else if (slide.background.startsWith("url(")) {
            if (slide.background.length > 10000) {
                console.warn("Optimizing large background...");
                const optimizedBackground = await optimizeImage(slide.background);
                console.log(optimizedBackground.length)
                doc.addImage(optimizedBackground, "JPEG", 0, 0, pageWidth, pageHeight);
            } else {
                doc.addImage(slide.background, "JPEG", 0, 0, pageWidth, pageHeight);
            }
        }

        const slideWidth = 850;
        const slideHeight = 460;

        const scaleX = pageWidth / slideWidth;
        const scaleY = pageHeight / slideHeight;
        const scale = Math.min(scaleX, scaleY);

        const offsetX = (pageWidth - slideWidth * scale) / 2;
        const offsetY = (pageHeight - slideHeight * scale) / 2;

        slide.objects.forEach((content: SlideObject) => {
            if (content.type === "text") {
                const fontSize = (content.fontSize || 16) * scale;
                const fontColor = "#000000";
                const fontFamily = content.fontFamily || "helvetica";

                doc.setFontSize(fontSize);
                doc.setTextColor(fontColor);
                doc.setFont(fontFamily, "normal")

                doc.text(
                    content.text,
                    offsetX + (content.x || 0) * scale,
                    offsetY + (content.y || 0) * scale,
                    {
                        maxWidth: (content.width || slideWidth) * scale,
                    }
                );
            }

            if (content.type === "image") {
                if (content.src && content.width && content.height) {
                    if (content.src.startsWith("url(") && content.src.length > 100000) {
                        console.error("Base64 string is too large, skipping image.");
                    } else {
                        doc.addImage(
                            content.src,
                            "JPEG",
                            offsetX + (content.x || 0) * scale,
                            offsetY + (content.y || 0) * scale,
                            content.width * scale,
                            content.height * scale
                        );
                    }
                } else {
                    console.error("Invalid image content", content);
                }
            }
        });
    });

    doc.save(`${editor.presentation.title || "Presentation"}.pdf`);
};
