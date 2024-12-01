import Image from 'next/image';
import Head from 'next/head';

import { getConfig } from '@/services/config';

import SocialMediaLinks from '@/components/common/SocialMediaLinks';

async function Home() {
  const config: Config = getConfig();

  // JSON-LD for the entire site
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.title,
    url: config.siteUrl,
    description: config.description,
    publisher: {
      '@type': 'Organization',
      name: config.author.name,
      url: config.author.link,
      logo: config.avatar,
    },
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className='flex max-h-[800px] animate-fadeInDown flex-col items-center justify-center px-6'>
        <div className='relative h-[30vh] w-full bg-cover bg-center md:h-[50vh]'>
          <div className='absolute left-1/2 top-[25%] -translate-x-1/2 transform'>
            <Image
              src={config.avatar}
              alt='Avatar'
              width={180}
              height={180}
              className='rounded-full border-4 border-[var(--sakuraPink)] shadow-lg'
              priority={true}
            />
          </div>
        </div>

        <div className='mt-20 text-center'>
          <p className='text-foreground mb-28 text-3xl font-bold'>
            {config.slogan}
          </p>

          <SocialMediaLinks
            socialMedia={config.socialMedia}
            iconSize={40}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
