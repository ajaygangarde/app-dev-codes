import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState('');

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };  

    const handleUpload = () => {
        // You can perform your upload logic here
        console.log(selectedFile);
        // For example, you can use FormData to upload the file via fetch or axios
        const formData = new FormData();
        formData.append('file', selectedFile);
        // Then send formData to your server
        fetch('http://localhost:8000/api/uploadResume', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log('File uploaded successfully2511');
                    // Handle success if needed
                } else {
                    console.error('Failed to upload file');
                    // Handle error if needed
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                // Handle error if needed
            });
    };

    return (
        <div>
            <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: 'image/*' }} // Define accepted file types if needed
            />
            <Button onClick={handleUpload} variant="contained" color="primary">
                Upload
            </Button>
        </div>
    );
};

export default FileUpload;
