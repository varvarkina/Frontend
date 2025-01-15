import { ajv, editorSchema } from './editorSchema.ts';
import { ChangeEvent } from "react";
import { setEditor } from "./editor";
import { useAppActions } from '../view/hooks/useAppActions.ts';

export function useImportFromJson() {
    const { importEditor } = useAppActions()

    return function importFromJson(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target?.files?.[0];
        if (!file) {
            console.error("Файл не выбран.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target?.result;

            if (typeof result === 'string') {
                try {
                    const importedData = JSON.parse(result);
                    
                    const currentSize = JSON.stringify(localStorage).length;
                    console.log(currentSize/1024/1024)
                    const maxSize = 5 * 1024 * 1024; // 5MB limit for localStorage

                    if (currentSize >= maxSize) {
                        console.warn("LocalStorage is full. Compressing data before saving.");
                        return;
                    }
                    const validateEditorData = ajv.validate(editorSchema, importedData)
                    if (validateEditorData) {
                        importEditor(importedData)
                        console.log("Данные успешно импортированы.");
                    } else {
                        console.error("Ошибка в структуре данных. Импорт отменен.");
                    }
                } catch (error) {
                    console.error("Ошибка при парсинге JSON:", error);
                }
            } else {
                console.error("Ошибка: результат чтения файла не является строкой.");
            }
        };

        reader.onerror = () => {
            console.error("Ошибка при чтении файла:", reader.error);
        };

        reader.readAsText(file);
    }
}