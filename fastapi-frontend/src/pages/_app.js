import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStateProvider } from "../context/GlobalState";
import '../styles/global.css';
import toast, { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <div>
        <Component {...pageProps} />
        <Toaster/>
      </div>
    </GlobalStateProvider>
  );
}
export default MyApp;
