import { useLayoutEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

import { HORIZONTAL_MAX_ITEM, MenuOrientation } from 'config';
import { useSelector } from 'store';
import useConfig from 'hooks/useConfig';

// project import
import NavGroup from './NavGroup';
import useAuth from 'hooks/useAuth';
import { adminDashboard, userDashboard } from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuItems, setMenuItems] = useState({ items: [] });
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (user?.role?.name === 'Admin') {
      setMenuItems({ items: [adminDashboard] });
    } else {
      setMenuItems({ items: [userDashboard] });
    }

    // eslint-disable-next-line
  }, []);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems = [];
  let lastItemId;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
