import React from 'react'
import { BodyText } from '../../styles/main'
import { useCommonModalContext } from '../../context/CommonModalContext';
import AlertMessage from '../../layouts/common/info-dialog/AlertMessage';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton, Stack } from '@mui/material';
import { Colors } from '../../styles/theme';
import { blue } from '@mui/material/colors';

const DemoAccountBtn = ({msg, limitations}) => {
    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

    const openMessage = () => {
        setCommonModalContent(<AlertMessage msg={msg} limitations={limitations} />)
        setCommonModalOpen(true);
    }

    return (
        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <BodyText variant='caption'>Demo limitations</BodyText>
            <IconButton
                onClick={openMessage}
                sx={QuestionIconStyle}
            >
                <QuestionMarkIcon fontSize='1rem' />
            </IconButton>
        </Stack>
    )
}

export default DemoAccountBtn;

const QuestionIconStyle = {
    backgroundColor: Colors.secondary, 
    color: Colors.white, 
    fontSize:'1rem', 
    padding:'3px',
    transition: '.7s all',
    ':hover': {
        backgroundColor: blue[500]
    }
}