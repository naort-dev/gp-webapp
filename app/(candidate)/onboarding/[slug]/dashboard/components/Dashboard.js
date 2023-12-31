import Script from 'next/script';
import Banner from './Banner';
import Help from './Help';
import Hero from './Hero';
import Steps from './Steps';
import UserSnapScript from '@shared/scripts/UserSnapScript';
import FullStoryScript from '@shared/scripts/FullStoryScript';
import SetShortVersionStatus from './SetShortVersionStatus';

export default function Dashboard(props) {
  return (
    <div className="bg-slate-100 min-h-[calc(100vh-56px)] relative pb-16">
      <Banner {...props} />
      <div className="max-w-screen-lg mx-auto px-4 xl:p-0">
        <Hero {...props} />
        <Steps {...props} />
        <SetShortVersionStatus {...props} />
        <Help />
        <Script
          type="text/javascript"
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js.hs-scripts.com/21589597.js"
        />
        <UserSnapScript />
        <FullStoryScript />
      </div>
    </div>
  );
}
