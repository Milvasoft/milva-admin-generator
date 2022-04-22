import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@utils/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GeneralProvider from '@src/providers/GeneralProvider';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: any) {
    
  return (
    <CacheProvider value={emotionCache}>
      <GeneralProvider>   
        <Component {...pageProps} />
      </GeneralProvider>
    </CacheProvider>
  );

}

export default appWithTranslation(MyApp);
