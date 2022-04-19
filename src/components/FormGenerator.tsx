/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';
import { IFormGenerator } from '@src/modules/app/types/IFormGenerator';
import { warningToast } from '@helpers/toast';
import { useForm } from 'react-hook-form';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import DrawerFooter from './DrawerFooter';
import UnControlledCheckBox from './UnControlledCheckBox';
import PhoneNumberInput from './PhoneNumberInput';

type props = {
  filterList : IFormGenerator[],
  handleConfirm: (form: any) => void,
  handleCancel: () => void
}

export default function FormGenerator({ filterList, handleConfirm, handleCancel }: props,) {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const formSubmit = useCallback((form: any) => handleConfirm({ ...form }), [handleConfirm]);

  useEffect(() => {

    let tempHelper = '';

    for (const key in errors) {

      if (Object.prototype.hasOwnProperty.call(errors, key)) {

        if (errors[key]) {

          const findedItem = filterList?.find((s) => s?.name === key);

          if (findedItem?.helperText && tempHelper !== findedItem?.helperText) {

            warningToast(findedItem?.helperText);

            tempHelper = findedItem?.helperText;

          }

        }

      }

    }

  }, [errors, filterList]);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {
        React.Children.toArray(filterList?.map((item) => {

          if (item.input === FormInputEnum.Text) {

            return (
              <TextField         
                defaultValue={item.defaultValue}
                placeholder={item?.placeholder}
                label={item?.title}
                fullWidth
                {...register(item?.name, { ...item.validation })}
              />
            );

          }

          if (item.input === FormInputEnum.Number) {

            return (
              <TextField          
                defaultValue={item.defaultValue}
                placeholder={item?.placeholder}
                label={item?.title}
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
            );

          }


          if (item.input === FormInputEnum.DateTime) {

            return (
              <TextField           
                type="datetime-local"
                defaultValue={item.defaultValue}
                label={item?.title}
                fullWidth
                {...register(item?.name, { ...item.validation })}
              />
            );

          }
       

          if (item.input === FormInputEnum.CheckBox && item?.checkList) {

            return (
              <UnControlledCheckBox
                data={item.checkList}
                register={register}
              />
            );

          }          

          if (item.input === FormInputEnum.PhoneNumber) {

            return (
              <PhoneNumberInput         
                defaultValue={item.defaultValue}
                placeholder={item?.placeholder}
                label={item?.title}
                fullWidth
                {...register(item?.name, { ...item.validation })}
              />
            );

          }
       

          return null;

        }))
      }


      <DrawerFooter handleCancel={handleCancel} />

    </form>
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
