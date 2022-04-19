import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';

export default function Add() {

  return (
    <Layout>

      AddUser

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
