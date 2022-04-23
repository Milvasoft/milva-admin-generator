/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Dropzone, FileItem } from '@dropzone-ui/react';
import { Box, SxProps, TextField } from '@mui/material';
import { IFormGenerator } from '@assets/types/IFormGenerator';
import { useForm } from 'react-hook-form';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useRouter } from 'next/router';
import { DateTimePicker } from '@mui/x-date-pickers';
import { ILangFormGenerator } from '@assets/types/ILangFormGenerator';
import DrawerFooter from '@components/drawer/DrawerFooter';
import UnControlledCheckBox from './UnControlledCheckBox';
import PhoneNumberInput from './PhoneNumberInput';
import AutoSelect from './AutoSelect';
import 'moment/locale/tr';
import FormLangGenerator from './FormLangGenerator';
import UnControlledRadioButton from './UnControlledRadioButton';

type props = {
  langFormList ?: ILangFormGenerator,
  formList : IFormGenerator[],
  onSubmit: (form: any) => void,
  handleCancel: () => void,
  sx?: SxProps
}

const defaultSxprops : SxProps = {
  mt: 1,
  py: 2,
  px: [1, 1, 3]
};
    
export default function FormGenerator({
  langFormList,
  formList, 
  onSubmit,
  sx,
  handleCancel
}: props,) {

  const router = useRouter();

  const [values, setValues] = useState<any>();

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const formSubmit = (form: any) => onSubmit({ ...form, ...values });

  const onChangeValue = useCallback((newValue:any) => setValues({ ...values, ...newValue }), [values]);

  useEffect(() => {
    
    formList?.forEach((item) => {

      if (item.input === FormInputEnum.DateTime || item.input === FormInputEnum.AutoSelect) {

        onChangeValue({ [item?.name]: item.defaultValue });
      
      }
     
    });
  
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={router.locale}>
      <form onSubmit={handleSubmit(formSubmit)}>

        {langFormList && <FormLangGenerator langFormList={langFormList} register={register} errors={errors} />}

        <Box sx={sx}>
        
          {
            React.Children.toArray(formList?.filter((s) => !s?.isHidden)?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <TextField         
                      defaultValue={item?.defaultValue}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      helperText={errors?.[item?.name] || item?.helperText}
                      fullWidth
                      {...register(item?.name, { ...item.validation })}
                      {...item?.textFieldProps}
                    />
                  </Box>
                );

              }

              if (item.input === FormInputEnum.Number) {

                return ( 
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <TextField          
                      defaultValue={item.defaultValue}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      helperText={errors?.[item?.name] || item?.helperText}
                      fullWidth
                      type="number"
                      inputProps={{ step: 'any' }}
                      onKeyPress={(event) => {
          
                        if (event?.key === '-' || event?.key === '+') {
          
                          event.preventDefault();
          
                        }
          
                      }}
                      {...register(item?.name, { ...item.validation })}
                      {...item?.textFieldProps}
                    />
                  </Box>
                );

              }

              if (item.input === FormInputEnum.DateTime) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <DateTimePicker 
                      value={values?.[item?.name]}
                      onChange={(date) => onChangeValue({ [item?.name]: date })}  
                      showToolbar    
                      showTodayButton
                      label={item?.title}
                      views={['year', 'month', 'day']}
                      renderInput={(params) => (
                        <TextField
                          {...params} 
                          {...register(item?.name, { ...item.validation })}
                          fullWidth
                          helperText={errors?.[item?.name] || item?.helperText}
                        />
                      )}
                    />
                  </Box>
                );

              }

              if (item.input === FormInputEnum.Radio && item?.radioList) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <UnControlledRadioButton
                      data={item.radioList}
                      title={item.title}
                      name={item.name}
                      register={register}
                    />
                  </Box>
                );

              }  
       
              if (item.input === FormInputEnum.CheckBox && item?.checkList) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <UnControlledCheckBox
                      data={item.checkList}
                      title={item.title}
                      register={register}
                    />
                  </Box>
                );

              }          

              if (item.input === FormInputEnum.PhoneNumber) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <PhoneNumberInput   
                      value={values?.[item?.name]}
                      handleChange={(value) => onChangeValue({ [item?.name]: value })}  
                      defaultValue={item.defaultValue}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      fullWidth                
                      helperText={errors?.[item?.name] || item?.helperText}
                      {...register(item?.name, { ...item.validation })}
                    />
                  </Box>
                );

              }    

              if (item.input === FormInputEnum.AutoSelect) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <AutoSelect 
                      fetchData={item?.fetchData}
                      defaultOptions={item?.defaultOptions}
                      label={item?.title}
                      limitTags={item?.limitTags}
                      value={values?.[item?.name]}
                      onChangeValue={(v) => onChangeValue({ [item?.name]: v })}    
                      helperText={item?.autoSelectRequired ? item?.helperText : undefined}    
                    />
                  </Box>
                );

              } 

              if (item.input === FormInputEnum.File) {

                return (
                  <Box sx={defaultSxprops} {...item?.boxProps}>
                    <Dropzone onChange={(v) => onChangeValue({ [item?.name]: v })} value={values?.[item?.name]}>
                      {values?.[item?.name]?.map((file: any) => (
                        <FileItem
                          {...file} 
                          onDelete={(id) => onChangeValue({ [item?.name]: values?.[item?.name]?.filter((x: any) => x?.id !== id) })}
                          key={file?.id}
                          info
                        />
                      ))}
                    </Dropzone>
                  </Box>
                );

              } 

              return null;

            }))
          }

          <DrawerFooter handleCancel={handleCancel} />

        </Box>


      </form>
    </LocalizationProvider>
  );

}

// const filterList = useMemo(() : IFilterGenerator[] => [
//   {
//     input: FormInputEnum.Text,
//     title: 'Ad Soyad',
//     name: 'name',
//     placeholder: 'Ad Soyad Giriniz',
//     defaultValue: filters?.name
//   },
//   {
//     input: FormInputEnum.DateTime,
//     title: 'İşten Ayrılma Tarihi',
//     name: 'quitDate',
//     defaultValue: filters?.quitDate
//   },
//   {
//     input: FormInputEnum.Slider,
//     title: 'Maaş',
//     nameMin: 'productCostLowerValue',
//     nameMax: 'productCostTopValue',
//     defaultMinValue: filters?.productCostLowerValue,
//     defaultMaxValue: filters?.productCostTopValue,
//   },
//   {
//     input: FormInputEnum.CheckBox,
//     title: 'Hala Çalışıyor Mu ?',
//     checkList: [
//       {
//         label: 'Evet',
//         name: 'yes',
//         defaultChecked: filters?.yes,
//       },
//       {
//         label: 'Hayır',
//         name: 'no',
//         defaultChecked: filters?.no,
//       },
//     ]
//   },
//   {
//     input: FormInputEnum.AutoSelect,
//     title: 'Pozisyonlar',
//     name: 'positions',
//     placeholder: 'Pozisyon Ara',
//     multiple: true,
//     fetchData: getSharedPositions,
//     defaultValue: filters?.positions
//   },
// {
//   input: FormInputEnum.DateTimeMultiple,
//   title: t('soldDate'),
//   from: { name: 'soldDateLowerValue', defaultValue: filters?.soldDateLowerValue },
//   to: { name: 'soldDateTopValue', defaultValue: filters?.soldDateTopValue }
// },
