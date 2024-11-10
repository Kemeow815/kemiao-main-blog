import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import Loading from '@/app/loading';
import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

import PostListLayout from '@/components/layout/PostListLayout';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: `Posts - ${config.title}`,
    description: `Posts page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      title: `Posts - ${config.title}`,
      description: `Posts page of ${config.title} - ${config.description}`,
      url: `${config.siteUrl}/posts`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

export default async function PostsPage() {
  const posts: PostData[] = await getAllPosts();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>All Posts</h1>
      <Suspense fallback={<Loading />}>
        <PostListLayout posts={posts} />
      </Suspense>
    </div>
  );
}
