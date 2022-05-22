/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';


const ListItem = styled('li')(({ theme }) => ({ margin: theme.spacing(0.5), }));

type props = {
    setValue: (v: string[]) => void,
    title?: string,
    placeholder?: string,
    defaultValue?: any,
}

export default function MultiChips({ 
  setValue, 
  title,
  placeholder,
  defaultValue,
}:props) {

  const { t } = useTranslation();

  const [label, setLabel] = React.useState('');

  const [chipData, setChipData] = React.useState<string[]>(defaultValue || []);

  const handleDelete = (val: string) => () => {

    setChipData((chips) => chips.filter((chip) => chip !== val));
  
  };

  const addData = () => {

    if (label !== '') {

      const newChips = [...chipData, label];
  
      setValue(newChips);

      setChipData(newChips);

      setLabel('');

    }
  
  };

  React.useEffect(() => {

    setValue(defaultValue);
    
  }, []);
  
  return (
    <Box>

      <Box sx={{ display: 'flex' }}>    

        <TextField 
          label={title}
          placeholder={placeholder} 
          variant="outlined"
          value={label}
          onChange={(e) => setLabel(e.target.value)}     
          fullWidth
        />
        
        <Button 
          endIcon={<AddIcon />} 
          onClick={addData}
          sx={{ ml: 4, textTransform: 'none' }}
          variant="contained"
        >
          {t('add')}
        </Button>

      </Box>
      
      { chipData?.length > 0 && (
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
            mt: 3,
          }}
          component="ul"
          elevation={0}
        >
          {chipData.map((data) => (
            <ListItem key={data}>
              <Chip label={data} onDelete={handleDelete(data)} />
            </ListItem>
          ))}

        </Paper>
      )}

    </Box>
  );

}
