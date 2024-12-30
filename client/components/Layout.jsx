import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="layout-body">{children}</div>
            <Footer />
        </div>
    );
};
export default Layout;
