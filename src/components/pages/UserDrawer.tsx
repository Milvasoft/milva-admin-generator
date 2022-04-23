import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { IDrawerComponent } from '@assets/types/IDrawerComponent';
import { IFormGenerator } from '@assets/types/IFormGenerator';
import { ILangFormGenerator } from '@assets/types/ILangFormGenerator';
import FormGenerator from '@components/form/FormGenerator';
import getSystemLanguageObject from '@helpers/getSystemLanguageObject';
import React, { useCallback, useMemo } from 'react';

export default function UserDrawer({ handleClose }: IDrawerComponent) {

  const formList = useMemo(() : IFormGenerator[] => [
    {
      input: FormInputEnum.Number,
      name: 'salary',
      title: 'Maaş',
      placeholder: 'Maaş Giriniz..',
    },
    {
      input: FormInputEnum.DateTime,
      name: 'startDate',
      title: 'İşe Başlama Tarihi',
    },
    {
      input: FormInputEnum.CheckBox,
      name: 'isWorking',
      title: 'Pozisyonlar',
      checkList: [
        {
          label: 'Evet',
          defaultChecked: true,
          name: 'yes'
        },
        {
          label: 'Hayır',
          defaultChecked: false,
          name: 'no'
        },
      ]
    },
    {
      input: FormInputEnum.PhoneNumber,
      name: 'phoneNumber',
      title: 'Telefon Numarası',
    },
    {
      input: FormInputEnum.AutoSelect,
      title: 'Pozisyonlar',
      name: 'positions',
      placeholder: 'Pozisyon Ara',
      multiple: true,
      defaultOptions: [{ id: 1, title: 'Yönetici' }, { id: 2, title: 'Muhasebe' }]
    },
  ], []);

  const langList = useMemo(() : ILangFormGenerator => ({
    arrayName: 'userLang',
    defaultValues: getSystemLanguageObject([
      {
        systemLangugeId: 0,
        name: 'Türkçe',        
        surname: 'Türkçe Soyad'
      },
      {
        systemLangugeId: 1,
        name: 'İngilizce',
        surname: 'İngilizce Soyad'
      },
    ]),
    form: [
      {
        input: FormInputEnum.Text,
        name: 'name',
        title: 'Ad',
        placeholder: 'Ad Giriniz'
      },
      {
        input: FormInputEnum.Text,
        name: 'surname',
        title: 'Soyad',
        placeholder: 'Soyad Giriniz',
      },
    ]
  }), []);
    
  const onSubmit = useCallback((form: any) => {
      
    console.log(form);
      
  }, []);

  return (
    <FormGenerator 
      formList={formList}
      langFormList={langList}
      handleConfirm={onSubmit}
      handleCancel={handleClose}
      sx={{ mt: 2 }}
    />
  );

}
