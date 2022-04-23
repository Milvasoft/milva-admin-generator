import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { ILangFormGenerator } from '@assets/types/ILangFormGenerator';
import { Box, SxProps, TextField } from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NextImage from 'next/image';

const defaultSxprops : SxProps = {
  mt: 1,
  py: 2,
};

type props ={
    langFormList:ILangFormGenerator,
    register: any,
    errors: any
}
    
export default function FormLangGenerator({ langFormList, register, errors, }: props) {

  const { arrayName, form, defaultValues } = langFormList;
    
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);
      
  return (        
    <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>

      <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

          <TabList onChange={handleChange} variant="fullWidth">

            <Tab
              label="TÜRKÇE" 
              value="1" 
              icon={(
                <Box>
                  <NextImage
                    src="/images/tr.png"
                    blurDataURL="/images/tr.png"
                    placeholder="blur"
                    width={42} 
                    height={28}    
                  />
                </Box>
              )}
            />

            <Tab         
              label="İNGİLİZCE"
              value="2"
              icon={(
                <Box>
                  <NextImage
                    src="/images/us.png"
                    blurDataURL="/images/us.png"
                    placeholder="blur"
                    width={42} 
                    height={28}    
                  />
                </Box>
              )}
            />

          </TabList>

        </Box>

        <TabPanel value="1">

          <input hidden {...register(`${arrayName}.${0}.systemLangugeId`)} value={0} />

          {
            React.Children.toArray(form?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>                       
                    <TextField                             
                      defaultValue={defaultValues?.[0]?.[item.name] || ''}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      helperText={errors?.[`${arrayName}.${0}.${item.name}`] || item?.helperText}
                      fullWidth
                      {...item?.textFieldProps}
                      {...register(`${arrayName}.${0}.${item.name}`, { ...item.validation })}
                    />
                  </Box>
                  
                );

              }

              return null;

            }))
          }
        </TabPanel>

        <TabPanel value="2">
          
          <input hidden {...register(`${arrayName}.${1}.systemLangugeId`)} value={1} />

          {
            React.Children.toArray(form?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>               
                    <TextField        
                      defaultValue={defaultValues?.[1]?.[item.name] || ''}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      helperText={errors?.[item?.name] || item?.helperText}
                      fullWidth
                      {...item?.textFieldProps}
                      {...register(`${arrayName}.${1}.${item.name}`, { ...item.validation })}
                    />
                  </Box>
                );

              }

              return null;

            }))
          }
        </TabPanel>

      </TabContext>
     

    </Box>
  );

}
