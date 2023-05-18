import H1 from '@shared/typography/H1';
import Link from 'next/link';

export default function Banner({ campaign }) {
  const { launchStatus, candidateSlug, slug } = campaign;
  return (
    <div className="pb-8">
      {launchStatus === 'launched' ? (
        <div className="p-2 text-lg text-center bg-green-600 text-white">
          Your campaign is launched.{' '}
          <Link href={`/candidate/${candidateSlug || slug}`}>
            Your Campaign
          </Link>
        </div>
      ) : null}
      {launchStatus === 'pending' ? (
        <div className="p-2 text-lg text-center bg-black text-white">
          Your campaign launch is pending a review.
        </div>
      ) : null}
    </div>
  );
}
