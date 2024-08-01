import React from 'react'
import { CustomTableCell } from '../../../../../../styles/main'
import { useThemeContext } from '../../../../../../context/ThemeContext';
import { useDCFContext } from '../../../../../../context/DCFContext';

const AssumptionsTableDataInputs = ({inputsNames, inputsData}) => {
    const { mode } = useThemeContext();
    const { value: { assumptionsSetup, setAssumptionsSetup, resetDCFIV, setAutoFill }} = useDCFContext();

    const handleInputsData = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setAssumptionsSetup({
            ...assumptionsSetup,
            [name]: value
        });
        setAutoFill(false);
        resetDCFIV();
    }

    return (
        <>
        <CustomTableCell>
            <input 
                type='number' 
                className={mode === 'dark' ? 'table-dcf-inputs' : 'table-dcf-inputs table-dcf-inputs-light'} 
                name={inputsNames?.low || ''}
                value={inputsData?.low}
                onChange={handleInputsData}
            />
        </CustomTableCell>
        
        <CustomTableCell>
            <input 
                type='number' 
                className={mode === 'dark' ? 'table-dcf-inputs' : 'table-dcf-inputs table-dcf-inputs-light'} 
                name={inputsNames?.mid || ''}
                value={inputsData?.mid}
                onChange={handleInputsData}
            />
        </CustomTableCell>

        <CustomTableCell>
            <input 
                type='number' 
                className={mode === 'dark' ? 'table-dcf-inputs' : 'table-dcf-inputs table-dcf-inputs-light'} 
                name={inputsNames?.high || ''}
                value={inputsData?.high}
                onChange={handleInputsData}
            />
        </CustomTableCell>
        </>
    )
}

export default AssumptionsTableDataInputs