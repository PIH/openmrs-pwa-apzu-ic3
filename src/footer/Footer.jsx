import React from 'react';
import { version } from '../../package.json';
import './footer.css';

const Footer = props => {
  return (
    <div className="app-footer">
      <span>APZU Screening App Version {version}</span>
    </div>
  );

};

export default Footer;
