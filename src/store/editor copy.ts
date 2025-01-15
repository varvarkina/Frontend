// import {editor} from './data.ts'
// import { EditorType } from './EditorType.ts'

// let _editor = editor
// let _handler: Function | null = null

// function getEditor() {
//     const SettedEditor = localStorage.getItem('Editor');
//     if (SettedEditor) {
//         const JSONEditor = JSON.parse(SettedEditor);
//         _editor = JSONEditor
//     }
//     return _editor
// }

// function setEditor(newEditor: EditorType) {
//     _editor = newEditor
//     localStorage.setItem('Editor', JSON.stringify(_editor))
//     if (_handler) {
//         _handler()
//     }
// }

// function dispatch(modifyFn: Function, payload?: Object): void {
//     const newEditor = modifyFn(_editor, payload)
//     setEditor(newEditor)

//     // if (_handler) {
//     //     _handler()
//     // }
// }

// function addEditorChangeHandler(handler: Function): void {
//     _handler = handler
// }

// export function exportToJson(editorState: EditorType) {
//     const json = JSON.stringify(editorState, null, 2); // Преобразуем состояние редактора в JSON
//     const blob = new Blob([json], { type: 'application/json' }); // Создаем Blob из JSON
//     const url = URL.createObjectURL(blob); // Создаем URL для Blob

//     const a = document.createElement('a'); // Создаем элемент <a>
//     a.href = url; // Устанавливаем URL
//     a.download = 'document.json'; // Указываем имя файла для скачивания
//     document.body.appendChild(a); // Добавляем элемент на страницу
//     a.click(); // Имитируем клик для скачивания
//     document.body.removeChild(a); // Удаляем элемент после скачивания
// }

// export function importFromJson(event: { target: { files: any[]; }; }) {
//     console.log("работает")
//     if (event.target && event.target.files) {
//     const file = event.target.files[0]; // Получаем выбранный файл
//     if (!file) {
//         console.log('нету файлика');
//         return
//     }

//     const reader = new FileReader(); // Создаем FileReader
//     reader.onload = (e) => {
//         // if (e.target == null){console.log(111111)}
//         if (e.target != null){
//         const result = e.target.result; // Получаем результат чтения
//         if (typeof result === 'string') { // Проверяем, является ли результат строкой
//             try {
//                 const json = JSON.parse(result); // Парсим содержимое файла как JSON
//                 // if (validateDocument(json)) {
//                 //     setEditor(json); // Обновляем состояние редактора
//                 //     console.log("Документ успешно загружен");
//                 // } else {
//                 //     console.error("Загруженный файл не прошел валидацию.");
//                 // }
//                 setEditor(json); // Обновляем состояние редактора
//                 console.log("Документ успешно загружен");
//             } catch (error) {
//                 console.error("Ошибка при загрузке файла:", error);
//             }
//         } else {
//             console.error("Результат чтения не является строкой.");
//         }
//     }
//     };
//     reader.readAsText(file); // Читаем файл как текст
//     }
//     else {
//         console.error("Event target or files property is undefined.");
//     }
// }

// export {
//     getEditor,
//     dispatch,
//     addEditorChangeHandler,
// }