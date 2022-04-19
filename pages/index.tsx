import {
  Box,
  Button,
  Container,
  TextField,
  Typography 
} from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function Login() {

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${'/images/loginBg.jpg'})`,
        backgroundSize: 'cover',  
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backdropFilter: 'blur(50px)',
          backgroundSize: 'cover',  
          borderRadius: 5,
          height: 540,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mx: [2, 0]
        }}
      >
        
        <Box sx={{ height: [100, 120], mt: 5 }}>

          <img 
            src="/images/loginBg.jpg"
            alt=""              
            style={{
              height: '100%', 
              width: '100%',
              objectFit: 'contain', 
              borderRadius: 10 
            }}
          />

        </Box>
      
        <Typography variant="h4" sx={{ mt: 5 }}>
          Giriş Yap
        </Typography>

        <TextField 
          label="Kullanıcı Adı"
          sx={{ width: 350, mt: 5 }}
        />

        <TextField 
          label="Parola"
          sx={{ width: 350, mt: 3 }}
        />

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'space-between', 
            width: 350,
            alignItems: 'center'
          }}
        > 

          <Typography>
            Şifremi Unuttum
          </Typography>
          
          <Link passHref href="/home">
            <Button variant="contained" sx={{ width: 130, textTransform: 'none' }}>
              Giriş Yap
            </Button>
          </Link>

        </Box>


      </Container>
    </Box>
  );

}

export async function getStaticProps({ locale }: any) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };

}
