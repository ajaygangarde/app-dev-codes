import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import FileUpload from '../../components/FileUpload';

export const OpenAIResumeParse = () => {

    return (
        <>
            <h1>Upload File and Parse it.</h1>
            <FileUpload />
        </>

    )
}