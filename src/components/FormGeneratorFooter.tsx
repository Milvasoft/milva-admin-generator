import React, { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

type PopupFooterParams = {
  handleCancel: () => void,
}

export default memo(function FormGeneratorFooter({ handleCancel }: PopupFooterParams) {

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
        sx={{ textTransform: 'none' }}
      >
        { t('cancel')}
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<SaveIcon />}
        sx={{ textTransform: 'none', ml: 2 }}
      >
        { t('reports.prepareReport')}
      </Button>
    </Box>
  );

});
