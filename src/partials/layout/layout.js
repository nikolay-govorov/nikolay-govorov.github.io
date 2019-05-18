import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Header from '../../block/header/header';
import Footer from '../../block/footer/footer';
import logo from '../../assets/images/logo.png';
import avatar from '../../assets/images/avatar.jpg';

import meta from '../../../data/meta';

import '../../styles/main.css';
import styles from './layout.module.css';

export default function BaseLayout({
  children, location, title,
}) {
  const pageTitle = title || meta.site.name;

  return (
    <>
      <Helmet>
        <html lang={meta.site.lang} />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{pageTitle}</title>
        <meta name="theme-color" content={meta.site.themes.light} />
        <meta name="description" content={meta.site.description} />

        <link rel="icon" type="image/png" href={logo} />
        <link rel="canonical" href={meta.site.url} />

        <meta property="og:url" content={meta.site.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={avatar} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:locale" content={meta.site.lang} />
        <meta property="og:site_name" content={meta.site.name} />
        <meta property="og:description" content={meta.site.description} />

        {/* Disable auto detected phone links for Safari and BlackBerry */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-rim-auto-match" content="none" />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.header}>
          <Header url={location.pathname} />
        </div>

        <div className={styles.content}>
          {children}
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

BaseLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.string.isRequired,
};
