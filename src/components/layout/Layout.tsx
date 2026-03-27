import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from '../ui/Breadcrumbs';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
