import Image from 'next/image';

import peopleImg from '/public/images/landing-pages/people.png';
import LandingPageHero from '@shared/landing-pages/LangdinPageHero';
import RunCampaignButton from './RunCampaignButton';

export default function Hero() {
  return (
    <LandingPageHero>
      <div className="relative pb-80 lg:pb-40">
        <div className="grid grid-cols-12 gap2">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-6xl leading-tight font-black">
              Free tools and expertise to run winning campaigns.
            </h1>
            <h2 className="text-xl font-bold mt-5 lg:w-[70%]">
              We help real people who want to serve their communities, run
              winning campaigns. Chat with an expert to learn how.
            </h2>
            <div className="w-full lg:w-60 mt-3 lg:mt-12">
              <RunCampaignButton />
            </div>
          </div>
        </div>
        <Image
          className="absolute bottom-0 left-1/2 -ml-[200px]"
          src={peopleImg}
          alt=""
          placeholder="blur"
          priority
          width={400}
          height={250}
        />
      </div>
    </LandingPageHero>
  );
}
