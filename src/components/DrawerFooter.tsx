import React, { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

type PopupFooterParams = {
  handleCancel?: () => void,
  handleConfirm?: () => void,
}

export default memo(function DrawerFooter({ handleCancel, handleConfirm }: PopupFooterParams) {

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        mt: 5,
      }}
    >

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCancel}
        endIcon={<ClearIcon />}
        sx={{ textTransform: 'none', color: 'white' }}
      >
        { t('cancel')}
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleConfirm}
        endIcon={<SaveIcon />}
        sx={{ textTransform: 'none', ml: 2, color: 'white' }}
      >
        { t('confirm')}
      </Button>
      
    </Box>
  );

});
