// import React, { useState } from 'react';
// import './Dropdown.module.css'; // Import your CSS for styling
// import { Button } from '../button/Button';

// function Dropdown() {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsOpen(prev => !prev);
//     };

//     const handleOptionClick = (option: string) => {
//         console.log(`Selected: ${option}`);
//         setIsOpen(false); // Close dropdown after selection
//     };

//     return (
//         <div className="dropdown">
//             <button onClick={toggleDropdown} className="dropbtn">Open Dropdown</button>
//             {isOpen && (
//                 <div className="dropdown-content">
//                     <Button className={styles.button} text={'Export'} onClick={onExportClick}></Button>
//                     <FileUpload onFileChange={onImportChange} labelContent={<span>Файл</span>} />
//                     {fileName && <p className={styles.import}>{fileName}</p>}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Dropdown;
