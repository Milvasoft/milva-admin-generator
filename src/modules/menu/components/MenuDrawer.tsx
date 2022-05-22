import React, { useCallback, useMemo } from 'react';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import DrawerLayout from '@components/drawer/DrawerLayout';
import FormGenerator from '@components/form/FormGenerator';
import getSystemLanguageObject from '@helpers/getSystemLanguageObject';
import { IFormGenerator } from '@src/modules/App/types/IFormGenerator';
import { ILangFormGenerator } from '@src/modules/App/types/ILangFormGenerator';
import { closeTableDrawer } from '@src/modules/ManagedTable/redux/slice';
import { useAppDispatch, useAppSelector } from '@utils/store';
import { useTranslation } from 'next-i18next';
import diffLang from '@helpers/diffLang';
// import { addMenuAPI, getAllMenusAPI, updateMenuAPI } from '../api/administration';

export default function MenuDrawer() {

  const data = useAppSelector((s) => s.managedTable?.drawer?.data);

  const { t } = useTranslation();
  
  const dispatch = useAppDispatch();

  const formList = useMemo(() : IFormGenerator[] => [
    {
      input: FormInputEnum.Text,
      name: 'code',
      title: t('code'),
      placeholder: t('enterCode'),
      defaultValue: data?.code,
      validation: { required: true, maxLength: 50 },
      helperText: t('helperTexts.characterLimitRequired', { count: 50 }),
      textFieldProps: { inputProps: { style: { textTransform: 'uppercase' } } }
    },
    {
      input: FormInputEnum.Text,
      name: 'description',
      title: t('definitionDescription'),
      placeholder: t('enterDefinitionDescription'),
      defaultValue: data?.description,
      validation: { maxLength: 8000 },
      helperText: t('helperTexts.characterLimit', { count: 8000 })
    },
    {
      input: FormInputEnum.Number,
      name: 'priority',
      title: t('priority'),
      placeholder: t('enterPriority'),
      defaultValue: data?.priority
    },      
    {
      input: FormInputEnum.Radio,
      name: 'isActive',
      title: t('isActive'),
      defaultValue: data?.isActive === undefined ? true : data?.isActive,
      radioList: [
        {
          label: t('yes'),
          value: true
        },
        {
          label: t('no'),
          value: false
        },
      ]
    },
  ], [data, t]);

  const langList = useMemo(() : ILangFormGenerator => ({
    arrayName: 'menuLangs',
    defaultValues: getSystemLanguageObject(data?.menuLangs),
    form: [
      {
        input: FormInputEnum.Text,
        name: 'name',
        title: t('name'),
        placeholder: t('enterName'),
        validation: { maxLength: 500 },
        helperText: t('helperTexts.characterLimit', { count: 500 }),
        defaultLangValidation: { required: true, maxLength: 500 },
        defaultLangHelperText: t('helperTexts.characterLimitRequired', { count: 500 })
      }
    ]
  }), [data?.menuLangs, t]);

  const handleClose = useCallback(() => dispatch(closeTableDrawer()), [dispatch]); 
    
  const onSubmit = useCallback((form: any) => {
     
    if (data?.id) {

      form.id = data.id;
            
      if (form?.menuLangs) form.menuLangs = diffLang(data?.menuLangs, form?.menuLangs) ? form?.menuLangs : undefined;

      console.log(dispatch);
          
      //   updateMenuAPI(form)
      //     .then(() => {

      //       dispatch(refreshTable(getAllMenusAPI));
    
      //     });
    
    } else {

      //   addMenuAPI(form)
      //     .then(() => {

      //       dispatch(refreshTable(getAllMenusAPI));
    
      //     });
  
    }
    
  }, [data?.id, data?.menuLangs, dispatch]);  

  return (
    <DrawerLayout title={t(data?.id ? 'editMenu' : 'addMenu')} handleCancel={handleClose} drawerInfo={data}>
  
      <FormGenerator 
        formList={formList}
        langFormList={langList}
        onSubmit={onSubmit}
        sx={{ mt: 2 }}
        handleCancel={handleClose}
      />

    </DrawerLayout>
  );

}
