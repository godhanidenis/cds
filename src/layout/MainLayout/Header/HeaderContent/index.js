// import { useMemo } from 'react';

// material-ui
import { Box } from '@mui/material';

// project import
// import Search from './Search';
// import Message from './Message';
import Profile from './Profile';
// import Notification from './Notification';
// import MobileSection from './MobileSection';
// import MegaMenuSection from './MegaMenuSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {/* {!matchesXs && <Search />} */}
      {/* {!matchesXs && megaMenu} */}
      {/* {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />} */}
      <Box sx={{ width: '100%', ml: 1 }} />
      {/* <Notification /> */}
      {/* <Message /> */}
      <Profile />
      {/* {matchesXs && <MobileSection />} */}
    </>
  );
};

export default HeaderContent;
