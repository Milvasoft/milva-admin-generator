import { FormInputEnum } from '@assets/enums/FormInputEnum';
import {
  Box, 
  SxProps,
  TextField, 
  Typography 
} from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import NextImage from 'next/image';
import { ILangFormGenerator } from '@src/modules/App/types/ILangFormGenerator';

const defaultSxprops : SxProps = {
  mt: 1,
  py: 2,
  px: [1, 1, 3]
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

        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== '1'}
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >

          <input
            hidden 
            {...register(`${arrayName}.${0}.systemLanguageId`)}
            value={1}
            type="number"
          />

          {
            React.Children.toArray(form?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>                       
                    <TextField                             
                      defaultValue={defaultValues?.[1]?.[item.name] || ''}
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
        </Typography>

        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== '2'}
          id={`simple-tabpanel-${2}`}
          aria-labelledby={`simple-tab-${2}`}
        >
          
          <input
            hidden
            {...register(`${arrayName}.${1}.systemLanguageId`)} 
            type="number"
            value={2}
          />

          {
            React.Children.toArray(form?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>               
                    <TextField        
                      defaultValue={defaultValues?.[2]?.[item.name] || ''}
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
        </Typography>

      </TabContext>
     

    </Box>
  );

}

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { FormInputEnum } from '@assets/enums/FormInputEnum';
// import {
//   Box,
//   SxProps,
//   TextField, 
//   Typography 
// } from '@mui/material';
// import React, { useCallback, useEffect, useState } from 'react';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import NextImage from 'next/image';
// import { ILangFormGenerator } from '@src/modules/App/types/ILangFormGenerator';
// import 'react-quill/dist/quill.snow.css';
// import dynamic from 'next/dynamic';
// import { useAppSelector } from '@utils/store';
// import { useTranslation } from 'next-i18next';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// const modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link'],
//     ['clean'],
//   ],
//   clipboard: {
//     matchVisual: false,
//   },
// };

// const defaultSxprops : SxProps = {
//   mt: 1,
//   py: 2,
//   px: [1, 1, 3]
// };

// type props ={
//     langFormList:ILangFormGenerator,
//     register: any,
//     errors: any,
//     setFormState: any
// }

// export default function FormLangGenerator({
//   langFormList,
//   register,
//   errors,
//   setFormState 
// }: props) {

//   const systemParametersDTO = useAppSelector((s) => s.appReducer.user?.systemParametersDTO);

//   const { arrayName, form, defaultValues } = langFormList;

//   const { t } = useTranslation();
    
//   const [tab, setTab] = useState<any>(1);
  
//   const [values, setValues] = useState<any>();

//   const onChangeValue = useCallback((name: string, value:any) => {

//     setValues({ ...values, [name]: value });

//     setFormState(name, value);

//   }, [setFormState, values]);

//   const handleChange = (event: React.SyntheticEvent, newValue: any) => setTab(newValue);

//   useEffect(() => {
    
//     form?.forEach((item) => {

//       if (item.input === FormInputEnum.Editor) {

//         systemParametersDTO?.usedLanguageIdList?.forEach((lang, index) => {

//           setFormState(`${arrayName}.${index}.${item.name}`, defaultValues?.[lang]?.[item.name] || '');

//         });
      
//       }
     
//     });
  
//   }, []);
      
//   return (        
//     <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>

//       <TabContext value={tab}>

//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

//           <TabList onChange={handleChange} variant="fullWidth">

//             {

//               systemParametersDTO?.usedLanguageIdList?.map((lang) => (
//                 <Tab
//                   key={lang}
//                   label={t(`languagesNumber.${lang}`)}
//                   value={lang}
//                   icon={(
//                     <Box>
//                       <NextImage
//                         src={`/images/flag/${lang}.png`}
//                         width={42} 
//                         height={28}    
//                       />
//                     </Box>
//                   )}
//                 />
//               ))
//             }

//           </TabList>

//         </Box>

//         {

//           systemParametersDTO?.usedLanguageIdList?.map((lang, index) => (
//             <Typography
//               key={lang}
//               component="div"
//               role="tabpanel"
//               hidden={tab !== lang}
//               id={`simple-tabpanel-${lang}`}
//               aria-labelledby={`simple-tab-${lang}`}
//             >

//               <input
//                 hidden 
//                 {...register(`${arrayName}.${index}.systemLanguageId`)}
//                 value={lang}
//                 type="number"
//               />

//               {
//                 React.Children.toArray(form?.map((item) => {

//                   if (item.input === FormInputEnum.Text) {

//                     return (
//                       <Box sx={defaultSxprops} {...item?.boxProps}>                       
//                         <TextField                             
//                           defaultValue={defaultValues?.[lang]?.[item.name] || ''}
//                           placeholder={item?.placeholder}
//                           label={item?.title}
//                           helperText={errors?.[`${arrayName}`]?.[index]?.[`${item.name}`]
//                            && (lang === systemParametersDTO.defaultSystemLanguageId ? item?.defaultLangHelperText : item.helperText)}
//                           fullWidth
//                           {...item?.textFieldProps}
//                           {...register(
//                             `${arrayName}.${index}.${item.name}`, 
//                             lang === systemParametersDTO.defaultSystemLanguageId ? { ...item.defaultLangValidation } : { ...item.validation }
//                           )}
//                         />
//                       </Box>
                  
//                     );

//                   }

//                   if (item.input === FormInputEnum.Editor) {

//                     return (
//                       <Box sx={defaultSxprops} {...item?.boxProps}>
//                         {/* @ts-ignore */}
//                         <ReactQuill 
//                           theme="snow"
//                           key={defaultValues?.[lang]?.[item.name] || ''}
//                           defaultValue={defaultValues?.[lang]?.[item.name] || ''}                   
//                           onChange={(value) => onChangeValue(`${arrayName}.${index}.${item.name}`, value)}  
//                           modules={modules}
//                           placeholder={item.placeholder}
//                         />

//                       </Box>

//                     );

//                   }

//                   return null;

//                 }))
//               }
//             </Typography>
//           ))
//         }

//       </TabContext>
     

//     </Box>
//   );

// }
