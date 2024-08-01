import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/material';
import { BodyText, BodyTextTitle, FormInputText, FormPrimaryActionBtn, LoadingBox } from '../../../styles/main';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import useUpdatePortfolio from '../../../hooks/portfolios/useUpdatePortfolio';
import useGetPortfoliosFromUser from '../../../hooks/portfolios/useGetPorfoliosFromUser';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';
import { ModalBoxSmall } from '../../../styles/modal';

const PortfoliosEdit = () => {
  const { value: {portfolios, portfolioSelected, setPortfolios}} = usePortfoliosContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingUpdatePortfolio, updatePortfolio } = useUpdatePortfolio();
  const { loadingPortfolios, getPortfoliosFromUser } = useGetPortfoliosFromUser();

  const [inputs, setInputs] = useState({
    input1: '',
    input2: ''
  })

  const handleUpdatePortfolio = async () => {
    await updatePortfolio(portfolioSelected, inputs.input1, inputs.input2);
    resetModalContent();
    const data = await getPortfoliosFromUser();
    if (data) {
        setPortfolios(data);
    }
  }

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setInputs({...inputs, [name]: value});
  }
  
  const validateData = () => {
      if (inputs?.input1?.length < 4) return toast.error('Portfolio name must have at least 4 characters');
      handleUpdatePortfolio();
  }

  useEffect(() => {
    setInputs({
      input1: portfolios?.find(element => element._id === portfolioSelected)?.name,
      input2: portfolios?.find(element => element._id === portfolioSelected)?.description
    })
  }, [portfolios, portfolioSelected]);

  return (
    <>
      <ModalBoxSmall>
        <Stack mb={2}>
            <BodyTextTitle variant='subtitle1'>Update portfolio</BodyTextTitle>
            <Divider />
        </Stack>
    

        <Stack gap={4}>
          <FormInputText required autoFocus type="text" label="Portfolio name" name="input1" value={inputs?.input1} onChange={handleFormData} />

          <FormInputText multiline rows={4} type="text" label="Portfolio description" name="input2" value={inputs?.input2} onChange={handleFormData} />
        </Stack>

        <FormPrimaryActionBtn
            disabled={loadingUpdatePortfolio}
            title={'Update portfolio'} 
            variant="outlined" 
            startIcon={<SaveIcon />}
            onClick={validateData}
        >
            {loadingUpdatePortfolio ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Update portfolio</BodyText> }
        </FormPrimaryActionBtn>
      </ModalBoxSmall>
    </>
  )
}

export default PortfoliosEdit;

