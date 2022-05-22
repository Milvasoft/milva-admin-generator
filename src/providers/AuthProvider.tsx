import { useCallback, useEffect, useState } from 'react';
import { setLoginInfo } from '@src/modules/App/redux/slice';
import { Routes } from '@utils/Routes';
import { useAppSelector } from '@utils/store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function AuthProvider({ children }: any) {

  const accessToken = useAppSelector((s) => s.appReducer.accessToken);

  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {

    if (router.asPath === '/') {

      setLoading(false);
    
    } else if (accessToken === undefined) {

      axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}api/getCookieInfo`)
        .then((res) => {
            
          dispatch(setLoginInfo({ accessToken: res?.data?.accessToken, user: JSON.parse(res?.data?.user) }));
  
          setLoading(false);
    
        })
        .catch(() => {

          router.push(Routes.index);
  
          setLoading(false);
          
        });

    } else {

      setLoading(false);
    
    }
  
  
  }, [dispatch, router, accessToken]);
  
  useEffect(() => {

    checkAuth();
  
  }, [checkAuth]);

  if (loading) return null;    

  return children;

}
