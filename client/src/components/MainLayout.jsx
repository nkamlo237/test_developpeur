import PropTypes from 'prop-types';

import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout({children}) {
  return (
    <div className='relative h-[100vh]'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}


MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};
