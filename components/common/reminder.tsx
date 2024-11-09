import { Typography } from '@mui/material';
import Link from '@/src/Link';
import { grey } from '@mui/material/colors';

interface ReminderProps {
  message: string;
  link: string;
  linkText: string;
}

export const Reminder: React.FC<ReminderProps> = ({ message, link, linkText }) => (
  <>
    <Typography sx={{ px: 1 }} color={grey[700]}>
      {message}
    </Typography>
    <Link href={link} underline="none">
      {linkText}
    </Link>
  </>
);
