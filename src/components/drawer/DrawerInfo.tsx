import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Divider,
  IconButton, 
  Popover,
  Typography,
  Box 
} from '@mui/material';
import { Info } from '@mui/icons-material';
import { getLocalize } from '@helpers/localizedDate';
import { styled, } from '@mui/material/styles';

type props = {
  data?: any
}

const CustomItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  marginTop: 5,
}));


export default memo(function DrawerInfo({ data }: props) {

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  const handleClick = useCallback((event: any) => setAnchorEl(event.currentTarget), []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  return (
    <>

      <IconButton
        sx={{
          position: 'absolute',
          top: '0px',
          left: '5px'
        }}
        color="primary"
        onClick={handleClick}
      >
        <Info />
      </IconButton>

      {open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              minWidth: 350,
              padding: 10,
              paddingBottom: 20,
              borderRadius: 15
            }
          }}
        >

          <Typography
            sx={{
              padding: 2,
              fontWeight: 700,
              fontSize: '1.2em',
              textAlign: 'center',
            }}
            color="primary"
          >
            {t('processInfo')}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <CustomItem>

            <Typography sx={{ fontWeight: 'bold', fontSize: '1em' }} color="primary">
              {t('creatorUser')}
              {' '}
              :
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>{data?.creatorUser?.userName || '-'}</Typography>

          </CustomItem>

          <CustomItem>

            <Typography sx={{ fontWeight: 'bold', fontSize: '1em' }} color="primary">
              {t('creationDate')}
              {' '}
              :
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {data?.creationDate ? getLocalize(data?.creationDate) : '-'}
            </Typography>

          </CustomItem>

          <CustomItem>

            <Typography sx={{ fontWeight: 'bold', fontSize: '1em' }} color="primary">
              {t('lastModifierUser')}
              {' '}
              :
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>{data?.lastModifierUser?.userName || '-'}</Typography>

          </CustomItem>

          <CustomItem>

            <Typography sx={{ fontWeight: 'bold', fontSize: '1em' }} color="primary">
              {t('lastModificationDate')}
              {' '}
              :
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {data?.lastModificationDate ? getLocalize(data?.lastModificationDate) : '-'}
            </Typography>
          </CustomItem>

        </Popover>
      )}
    </>
  );

});
