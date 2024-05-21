import { Handyman as ToolsIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export function ScreenErrorMessage({
  title = "We're sorry, but something went wrong",
  subtitle = 'Please try again later',
  noIcon = false,
  Icon = ToolsIcon,
}: Props) {
  return (
    <Box
      data-testid="error-message"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {!noIcon && <Icon sx={{ fontSize: 75 }} color="primary" />}
      <Typography variant="h5" color="primary">
        {title}
      </Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
}

type Props = {
  title?: string;
  subtitle?: string;
  noIcon?: boolean;
  Icon?: React.ElementType;
};
