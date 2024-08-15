import { useAuthContext } from '../context/AuthContext';
import { Colors } from "../styles/theme";
import { BodyText } from '../styles/main';
import LayoutTitle from '../layouts/common/LayoutTitle';
import { useNavigate } from 'react-router-dom';
import ViewedCompanies from '../components/viewed-companies/ViewedCompanies';
import DemoLocalAccount from '../components/demo-local-account/DemoLocalAccount';

const Homepage = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  return (
  <>
    <LayoutTitle title={'Welcome '} titleSpan={authUser?.name} />
    <BodyText variant='body1' mb={4}>
      Check out your <span onClick={() => navigate('/watchlists')} style={spanStyle}>watchlists</span>, <span onClick={() => navigate('/portfolios')} style={spanStyle}>portfolios</span> or search for a stock ticker to check its details and analysis.
    </BodyText>

    { authUser?.role === 'guest' && <ViewedCompanies /> }

    { authUser?.role === 'local' && <DemoLocalAccount /> }
  </>
  )
}

export default Homepage;

const spanStyle = {
  color: Colors.primary, 
  cursor: 'pointer',
  transition: '.7s all',
  ':hover': {
    color: `${Colors.secondary} !important`,
  }
}