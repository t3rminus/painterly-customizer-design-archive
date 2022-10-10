import '@/styles/globals.scss'
import Layout from '@/components/layout/main';
import { TippyContext } from '@/components/page/Tooltip';

const contexts = [
  TippyContext
];

function MyApp({ Component, pageProps }) {
  const App = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  return contexts.reduce((E, C) => <C>{E}</C>, App);
}

export default MyApp;