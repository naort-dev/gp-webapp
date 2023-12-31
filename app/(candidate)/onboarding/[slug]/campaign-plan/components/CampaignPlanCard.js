import ArticleSnippet from 'app/blog/shared/ArticleSnippet';
import Image from 'next/image';
import Link from 'next/link';

export default function CampaignPlanCard({ field, articlesBySlug, campaign }) {
  let { title, description, type, href, slug, isOnboardingLink, file } = field;
  let articleSlug = '';
  if (type === 'section') {
    return (
      <div className="col-span-12 text-2xl font-black mt-4" key={title}>
        {title}
      </div>
    );
  }
  if (type === 'inProgress') {
    return (
      <>
        <div
          className="col-span-12 lg:col-span-6 text-center lg:text-center text-2xl self-center"
          key={title}
        >
          Your report is being generated by our team
          <br />
          and we&apos;ll notify you when it&apos;s ready.
        </div>
        <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
          <Image
            src="/images/campaign/in-progress.svg"
            width={277}
            height={279}
            alt="In Progress"
            className="inline-block"
          />
        </div>
      </>
    );
  }

  if (type === 'blog') {
    const content = articlesBySlug[slug];
    if (!content) {
      return null;
    }
    title = content.title;
    description = content.summary;
    articleSlug = content.slug;

    // return (
    //   <div key={title} className="col-span-12 md:col-span-6 lg:col-span-4 ">
    //     <ArticleSnippet article={content} target="_blank" minimal />
    //   </div>
    // );
  }

  // if (type === 'file') {
  //   return (
  //     <article
  //       key={title}
  //       className="col-span-12 md:col-span-6 lg:col-span-4  bg-slate-50 rounded-lg p-6 flex justify-between flex-col"
  //     >
  //       <div>
  //         <h4 className="font-black text-2xl">{title}</h4>
  //         <div className="text-sm mt-4 mb-9">{description}</div>
  //       </div>
  //       <a href={file} className="text-violet-600 font-bold" download>
  //         Download File
  //       </a>
  //     </article>
  //   );
  // }
  return (
    <article
      key={title}
      className="col-span-12 md:col-span-6 lg:col-span-3  bg-slate-50 rounded-lg p-6 flex justify-between flex-col"
    >
      <div>
        <h4 className="font-black text-2xl">{title}</h4>
        <div className="text-sm mt-4 mb-9">{description}</div>
      </div>
      {type === 'link' && (
        <Link
          href={`${
            isOnboardingLink ? `/onboarding/${campaign?.slug}` : ''
          }${href}`}
          className="text-violet-600 font-bold text-sm candidate_content"
        >
          Read More
        </Link>
      )}
      {type === 'blog' && (
        <Link
          href={`/blog/article/${articleSlug}`}
          className="text-violet-600 font-bold text-sm candidate_content"
        >
          Read More
        </Link>
      )}
      {type === 'file' && (
        <div>
          <a
            href={file}
            className="text-white bg-black py-2 px-3 font-bold inline-block rounded text-sm candidate_content"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            DOWNLOAD
          </a>
        </div>
      )}
    </article>
  );
}
