import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStateProvider } from "../context/GlobalState";
import styles from "../styles/global.module.css";
import '../styles/global.css';
import Nav from "@/components/nav/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </GlobalStateProvider>
  );
}
export default MyApp;
