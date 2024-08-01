import { Button, Link, Stack } from '@mui/material'
import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const ProfileAnnualReports = () => {
    const { value: { stockDetails: { balanceSheet }}} = useStockDetailsContext();

    return (
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            { balanceSheet?.map((element, idx) => (
                <Link key={idx} href={element.finalLink} target="_blank">
                    <Button 
                        title={`Annual report ${element?.calendarYear}`} 
                        variant="text" 
                        startIcon={<InsertDriveFileIcon />} 
                        sx={{position:'inherit'}}
                    >
                        {element?.calendarYear}
                    </Button>
                </Link>
            ))}
        </Stack>
    )
}

export default ProfileAnnualReports