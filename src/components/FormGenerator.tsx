/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Grid, SxProps, TextField } from '@mui/material';
import { IFormGenerator } from '@src/modules/app/types/IFormGenerator';
import { useForm } from 'react-hook-form';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import DrawerFooter from './DrawerFooter';
import UnControlledCheckBox from './UnControlledCheckBox';
import PhoneNumberInput from './PhoneNumberInput';
import AutoSelect from './AutoSelect';

type props = {
  formList : IFormGenerator[],
  handleConfirm: (form: any) => void,
  handleCancel?: () => void
}

const defaultSxprops : SxProps = {
  mt: 1,
  py: 2,
  px: [1, 1, 3]
};
    
export default function FormGenerator({ formList, handleConfirm, handleCancel }: props,) {

  const router = useRouter();

  const [values, setValues] = useState<any>();

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const formSubmit = useCallback((form: any) => handleConfirm({ ...form }), [handleConfirm]);

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
        <Grid container spacing={2}>
        
          {
            React.Children.toArray(formList?.map((item) => {

              if (item.input === FormInputEnum.Text) {

                return (
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
                    <TextField         
                      defaultValue={item?.defaultValue}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      helperText={errors?.[item?.name] || item?.helperText}
                      fullWidth
                      {...register(item?.name, { ...item.validation })}
                    />
                  </Grid>
                );

              }

              if (item.input === FormInputEnum.Number) {

                return ( 
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
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
                    />
                  </Grid>
                );

              }

              if (item.input === FormInputEnum.DateTime) {

                return (
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
                    <DatePicker 
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
                  </Grid>
                );

              }
       
              if (item.input === FormInputEnum.CheckBox && item?.checkList) {

                return (
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
                    <UnControlledCheckBox
                      data={item.checkList}
                      title={item.title}
                      register={register}
                    />
                  </Grid>
                );

              }          

              if (item.input === FormInputEnum.PhoneNumber) {

                return (
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
                    <PhoneNumberInput         
                      defaultValue={item.defaultValue}
                      placeholder={item?.placeholder}
                      label={item?.title}
                      fullWidth                
                      helperText={errors?.[item?.name] || item?.helperText}
                      {...register(item?.name, { ...item.validation })}
                    />
                  </Grid>
                );

              }    

              if (item.input === FormInputEnum.AutoSelect) {

                return (
                  <Grid
                    xs={12} sm={6} sx={defaultSxprops}
                    {...item?.gridProps}
                  >
                    <AutoSelect 
                      fetchData={item?.fetchData}
                      defaultOptions={item?.defaultOptions}
                      label={item?.title}
                      limitTags={item?.limitTags}
                      value={values?.[item?.name]}
                      onChangeValue={(v) => onChangeValue({ [item?.name]: v })}    
                      helperText={item?.autoSelectRequired ? item?.helperText : undefined}    
                    />
                  </Grid>
                );

              } 

              return null;

            }))
          }

          <DrawerFooter handleCancel={handleCancel} />

        </Grid>

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
