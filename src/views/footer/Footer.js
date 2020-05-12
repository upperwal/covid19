import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import './Footer.scss'

class FooterComponent extends React.Component {
    render() {
        return (
            <footer>
                
            </footer>
            
        )
    }
}

const FooterTrans = withTranslation()(FooterComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Footer() {
  return (
    <Suspense fallback="loading">
      <FooterTrans />
    </Suspense>
  );
}
