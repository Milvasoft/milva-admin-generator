import { Box, Button, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';
import { Clear, PhotoCamera } from '@mui/icons-material';

export interface IPhotoState {
    selectedFile?: string | ArrayBuffer | null | undefined,
    file?: File | null
}
  
type props ={
    setValue: any,
    imageUrl?: string,
    name: string,
    defaultAltValue?: string
}
export default function ImageUpload({
  imageUrl, 
  setValue, 
  name,
  defaultAltValue 
} :props) {    

  const { t } = useTranslation();

  const [photoState, setPhotoState] = useState<IPhotoState>({ selectedFile: null, file: null });

  const [removed, setRemoved] = useState(false);

  const [altValue, setAltValue] = useState('');

  const removeIcon = useCallback(() => {

    setPhotoState({ selectedFile: null, file: null });

    setRemoved(true);

  }, []);

  const onChangeImage = useCallback(({ selectedFile, file } : IPhotoState) => {
  
    setPhotoState({ selectedFile, file });

    setValue(name, { imageBase64String: selectedFile, altValue });
  
  }, [altValue, name, setValue]);

  const onChangeAltValue = useCallback((e:any) => {

    setAltValue(e?.target?.value);
  
    setValue(name, { imageBase64String: photoState?.selectedFile, altValue: e?.target?.value });
    
  }, [name, photoState?.selectedFile, setValue]);
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >

      <NextImage
        width="350"
        height="150"
        src={photoState?.selectedFile ? `${photoState?.selectedFile}` : (removed ? '/images/noImage.png' : (imageUrl || '/images/noImage.png'))}
        blurDataURL={imageUrl}
        placeholder={imageUrl ? 'blur' : 'empty'}
        alt="image"
        className="image-upload-image"
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1 
        }}
      >

        <input        
          id="productImage"
          accept="image/*"
          type="file"
          hidden
          onChange={(event) => ImageFromFileReader(event, 'productImage', onChangeImage)}
        />

        <label htmlFor="icon-button-file">

          <Button
            color="primary"
            sx={{
              width: 200,
              textTransform: 'none',
              fontSize: 'calc(0.2vw + 16px)',
            }}
            size="small"
            component="span"
            endIcon={<PhotoCamera fontSize="large" />}
            onClick={() => handleInputTrigger('productImage')}
          >
            {t('changePhoto')}
          </Button>

        </label>

        <Button
          color="primary"  
          sx={{
            width: 200,
            textTransform: 'none',
            fontSize: 'calc(0.2vw + 16px)',
          }}
          size="small"
          component="span"
          endIcon={<Clear fontSize="large" />}
          onClick={removeIcon}
        >
          {t('removePhoto')}
        </Button>

      </Box>

      <TextField   
        value={altValue}
        defaultValue={defaultAltValue}   
        onChange={onChangeAltValue} 
        label="Alt Değer"
        fullWidth
        sx={{ mt: 1 }}
        size="small"
      />

    </Box>
  );

}
export function ImageFromFileReader(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, imageElementId: string, setState: any) {
  
  const target = event.target as HTMLInputElement;
  
  const file: File = (target.files as FileList)[0];
  
  if (file?.type?.includes('image')) {
  
    const reader = new FileReader();
    reader.onload = function (e) {
    
      setState && setState({ selectedFile: e.target?.result, file });

      document.getElementById(imageElementId)?.setAttribute('src', `${e.target?.result}`);
  
    };
  
    reader.readAsDataURL(file);
  
  } 
  
}

export const handleInputTrigger = (id:any) => document.getElementById(id)?.click();
