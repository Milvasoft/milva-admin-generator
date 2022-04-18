import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';
import CustomTable from '@components/CustomTable';

export default function Home() {

  return (
    <Layout>

      <CustomTable />

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
