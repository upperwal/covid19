import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

class JanataCurfewComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="imp-message">
                    <h1>{t('sd.jan_curfew_message')}</h1>
                    {<span>{t('sd.jan_curfew_submessage')}</span>}
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
