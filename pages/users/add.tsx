import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';
import { Typography } from '@mui/material';

export default function Add() {

  return (
    <Layout>

      <Typography variant="h4">
        Add User
      </Typography>

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
