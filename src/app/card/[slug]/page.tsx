import { Metadata } from 'next';
import InteractiveCard from '@/components/InteractiveCard';
import stories from '../../../data/stories.json';

type PageParams = { params: { slug: string } };

export default async function Page({ params }: PageParams) {
  const story = stories.find((s) => s.slug === params.slug);
  
  if (!story) {
    return <div className="p-4">Story not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <InteractiveCard 
        initialStory={story} 
        stories={stories}
      />
      <a
        href="https://hunter.vc"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by hunter labs
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
  const story = stories.find((s) => s.slug === params.slug);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: `3 by 5 | ${story.title}`,
    description: story.summary,
    openGraph: {
      title: `3 by 5 | ${story.title}`,
      description: story.summary,
      type: 'article',
      authors: [story.author],
    },
  };
}
