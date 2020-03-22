import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

class JanataCurfewComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="imp-message">
                    <h1>{t('sd.jan_curfew_message')}</h1>
                    <span>22nd March 07:00 AM to 09:00 PM</span>
                </div>
            </>
        );
    }
}

const JanataCurfewTrans = withTranslation()(JanataCurfewComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function JanataCurfew() {
  return (
    <Suspense fallback="loading">
      <JanataCurfewTrans />
    </Suspense>
  );
}
