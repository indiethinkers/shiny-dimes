import { Metadata } from 'next';
import Card from '@/components/Card';
import { fetchStoriesData } from '@/app/actions';
import type { Story } from '@/types';

type PageParams = { params: Promise<{ slug: string }> };

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const stories = await fetchStoriesData();
  const story = stories.find((s: Story) => s.slug === slug);
  
  if (!story) {
    return <div className="p-4">Story not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <Card 
        initialStory={story} 
        allStories={stories}
      />
      <a
        href="https://codenprose.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        hit the spacebar for another dime
      </a>
    </div>
  );
}

export async function generateStaticParams() {
  const stories = await fetchStoriesData();
  return stories.map((story: Story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const stories = await fetchStoriesData();
  const story = stories.find((s: Story) => s.slug === slug);
  
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
