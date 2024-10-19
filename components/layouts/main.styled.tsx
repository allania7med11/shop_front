import { styled } from '@mui/material/styles';
import { drawerWidth } from '@/constants/drawerWidth';

interface IsMainProps {
  open?: boolean;
}

export const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<IsMainProps>(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        marginLeft: `${drawerWidth}px`,
      },
    }),
  })
);
