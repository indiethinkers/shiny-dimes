import { Metadata } from 'next';
import Link from 'next/link';

import Card from '@/components/Card';
import stories from '../../../data/stories.json';

type PageParams = { params: Promise<{ slug: string }> };

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  
  if (!story) {
    return <div className="p-4">Story not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">

      <Card initialStory={story} />
      <a
        href="https://codenprose.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by codenprose
      </a>
    </div>
  );
}

export async function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: `Shiny Dimes | ${story.title}`,
    description: story.quote,
    openGraph: {
      title: `Shiny Dimes | ${story.title}`,
      description: story.quote,
      type: 'article',
      authors: [story.author],
    },
  };
}
