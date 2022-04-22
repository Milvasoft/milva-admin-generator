import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';
import { Container, Typography } from '@mui/material';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { IFormGenerator } from '@src/modules/app/types/IFormGenerator';
import { useCallback, useMemo } from 'react';
import FormGenerator from '@components/FormGenerator';

export default function Add() {

  const formList = useMemo(() : IFormGenerator[] => [
    {
      input: FormInputEnum.Text,
      name: 'nameSurname',
      title: 'Ad Soyad',
      placeholder: 'Ad Soyad Giriniz',
    },
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

  const onSubmit = useCallback((form: any) => {
  
    console.log(form);
  
  }, []);
  
  return (
    <Layout>

      <Container maxWidth="md" sx={{ mt: 1 }}>

        <Typography variant="h4" color="primary" textAlign="center">
          Add User
        </Typography>
      
        <FormGenerator 
          formList={formList}
          handleConfirm={onSubmit}
          sx={{ mt: 2 }}
        />

      </Container>

    </Layout>
  );

}

export async function getStaticProps({ locale }: any) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };

}
