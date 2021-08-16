
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "../styles/globals.css";
import "antd/dist/antd.css";
import AuthProvider from "../context/AuthProvider";
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  
  return getLayout(
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
}
