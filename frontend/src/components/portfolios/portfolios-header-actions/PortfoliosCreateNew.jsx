import React, { useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/material';
import { BodyText, BodyTextTitle, FormInputText, FormPrimaryActionBtn, LoadingBox } from '../../../styles/main';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import toast from 'react-hot-toast';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import useCreatePortfolio from '../../../hooks/portfolios/useCreatePortfolio';
import useGetPortfoliosFromUser from '../../../hooks/portfolios/useGetPorfoliosFromUser';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';
import { ModalBoxSmall } from '../../../styles/modal';

const PortfoliosCreateNew = () => {
  const { value: {portfolios, setPortfolios, setPortfolioSelected}} = usePortfoliosContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingCreatePortfolio, createPortfolio } = useCreatePortfolio();
  const { getPortfoliosFromUser } = useGetPortfoliosFromUser();

  const [inputs, setInputs] = useState({input1: '', input2: ''})

  const handleCreatePortfolio = async () => {
    await createPortfolio(inputs.input1, inputs.input2);
    resetModalContent();
    const data = await getPortfoliosFromUser();
    if (data) {
        setPortfolios(data);
        setPortfolioSelected(data[data.length - 1]?._id);
    }
  }

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setInputs({...inputs, [name]: value});
  }
  
  const validateData = () => {
      if (inputs?.input1?.length < 4) return toast.error('Portfolio name must have at least 4 characters');
      handleCreatePortfolio();
  }

  return (
    <>
      <ModalBoxSmall>
          <Stack mb={2}>
              <BodyTextTitle variant='subtitle1'>Create new portfolio</BodyTextTitle>
              <Divider />
          </Stack>
      
          <Stack gap={4}>
            <FormInputText required autoFocus type="text" label="Portfolio name" name="input1" value={inputs?.input1} onChange={handleFormData} placeholder={`My portfolio ${portfolios?.length + 1}`} />

            <FormInputText multiline type="text" label="Portfolio description" name="input2" value={inputs?.input2} onChange={handleFormData} />
          </Stack>

          <FormPrimaryActionBtn
              disabled={loadingCreatePortfolio}
              title={'Create portfolio'} 
              variant="outlined" 
              startIcon={<AddCircleOutlineIcon />}
              onClick={validateData}
          >
              {loadingCreatePortfolio ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Create portfolio</BodyText> }
          </FormPrimaryActionBtn>
      </ModalBoxSmall>
    </>
  )
}

export default PortfoliosCreateNew;

