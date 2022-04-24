import React, {
  useCallback, 
  useEffect,
  useMemo,
  useState 
} from 'react';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { IFormGenerator } from '@assets/types/IFormGenerator';
import { ILangFormGenerator } from '@assets/types/ILangFormGenerator';
import DrawerLayout from '@components/drawer/DrawerLayout';
import FormGenerator from '@components/form/FormGenerator';
import getSystemLanguageObject from '@helpers/getSystemLanguageObject';
import { closeTableDrawer } from '@src/modules/ManagedTable/redux/slice';
import { useAppDispatch } from '@utils/store';
import SkeletonGenerator from '@components/form/SkeletonGenerator';


export default function UserDrawer() {
    
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

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
      input: FormInputEnum.Radio,
      name: 'isWorking',
      title: 'Çalışıma Durumu',
      radioList: [
        {
          label: 'Evet',
          value: true,
        },
        {
          label: 'Hayır',
          value: false
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
    {
      input: FormInputEnum.File,
      name: 'files',
      title: 'File',
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
    
  const handleClose = useCallback(() => dispatch(closeTableDrawer()), [dispatch]); 

  const onSubmit = useCallback((form: any) => {
      
    console.log(form);
          
  }, []);

  useEffect(() => {

    // TODO Get Data

    setLoading(false);
  
  }, []);  

  return (    
    loading
      ? <SkeletonGenerator count={formList.length + langList.form.length} />
      : (
        <DrawerLayout title="Kullanıcı Ekle" handleCancel={handleClose}>
  
          <FormGenerator 
            formList={formList}
            langFormList={langList}
            onSubmit={onSubmit}
            handleCancel={handleClose}
            sx={{ mt: 2 }}
          />

        </DrawerLayout>
      )    
   
  );

}
