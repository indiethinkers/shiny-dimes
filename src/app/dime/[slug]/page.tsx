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
      <Link
        href="/"
        className="fixed top-4 left-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        shiny dimes
      </Link>
      <div className="fixed top-4 right-4 flex items-center gap-4">
        <img
          src="/google.svg"
          alt="Google"
          className="h-8 w-auto hidden"
        />
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
        >
          download chrome extension
        </a>
      </div>
      <Card 
        initialStory={story} 
        stories={stories}
      />
      <a
        href="https://hunter.vc"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by indie thinkers
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
