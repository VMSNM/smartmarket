import { BodyText, LoadingBox } from '../styles/main';
import LayoutTitle from '../layouts/common/LayoutTitle';
import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { usePortfoliosContext } from '../context/PortfoliosContext';
import useGetPortfoliosFromUser from '../hooks/portfolios/useGetPorfoliosFromUser';
import PortfoliosHeaderActions from '../components/portfolios/portfolios-header-actions/PortfoliosHeaderActions';
import SelectedPortfolio from '../components/portfolios/selected-portfolio/SelectedPortfolio';
import DemoAccountBtn from '../components/common/DemoAccountBtn';
import { portfolioDemoLimitations } from '../utils/messages';

const Portfolios = () => {
    const { value: {portfolioType, portfolios, setPortfolios, setPortfolioSelected}} = usePortfoliosContext();
    const { loadingPortfolios, getPortfoliosFromUser } = useGetPortfoliosFromUser();
    const portfolioLimitations = portfolioDemoLimitations;

    const getPortfolios = async () => {
        const data = await getPortfoliosFromUser();
        if (data) {
            setPortfolios(data);
            (data.length > 0) ? setPortfolioSelected(data[0]?._id) : setPortfolioSelected('');
            return;
        }
        setPortfolioSelected('');
    }

    useEffect(() => {
        if (portfolioType === 'Beginner Setup') getPortfolios();
    }, [portfolioType]);

    return (
    <>
        <Stack mb={4}>
            <LayoutTitle title={'Your '} titleSpan={'Portfolios'} />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                <BodyText variant='body1'>
                    Check and modify your portfolios and transactions below!
                </BodyText>
                {/* { authUser?.role === 'guest' && ( */}
                    <DemoAccountBtn 
                        msg={portfolioLimitations?.msg} 
                        limitations={portfolioLimitations?.limitations} 
                    />
                {/* )} */}
            </Stack>
        </Stack>

        { loadingPortfolios && (
            <LoadingBox>
                <CircularProgress />
            </LoadingBox>
        )}

        { !loadingPortfolios && portfolios && (
            <>  
                <PortfoliosHeaderActions />

                { portfolioType === 'Beginner Setup' ? 
                <>
                    { portfolios?.length === 0  && <BodyText variant='subtitle2'>No portfolios created yet</BodyText> }
                    { portfolios.length > 0 && <SelectedPortfolio /> }
                </> 
                : 
                <>
                </> 
                }
            </>
        )}
    </>
    )
}

export default Portfolios;