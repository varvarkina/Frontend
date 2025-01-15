import { EditorType } from "./EditorType";

export function exportToJson(editorState: EditorType) {
    const json = JSON.stringify(editorState, null, 2); 
    const blob = new Blob([json], { type: 'application/json' }); 
    const url = URL.createObjectURL(blob); 

    const a = document.createElement('a'); 
    a.href = url; 
    a.download = 'document.json'; 
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a); 
}