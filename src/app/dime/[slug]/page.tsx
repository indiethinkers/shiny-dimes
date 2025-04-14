import { Metadata } from 'next';
import Card from '@/components/Card';
import KeyboardHandler from '@/components/KeyboardHandler';
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
      <div className="fixed top-4 right-4 flex gap-2">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScOZVI77oj81iubi5AgluN-vC6d4d9fdweAYmkVJlfcGW33DQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          submit
        </a>
        <span className="text-sm text-gray-500">{'//'}</span>
        <a
          href="https://indiethinkers.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          subscribe
        </a>
      </div>
      <KeyboardHandler 
        allStories={stories}
      />
      <Card 
        initialStory={story} 
        allStories={stories}
      />

      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span className="hidden md:inline">hit the spacebar for another dime</span>
        <span className="md:hidden">double tap for another dime</span>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const stories = await fetchStoriesData();
  // Use the story's slug directly, which is now a hash-based ID
  return stories.map((story: Story) => ({
    slug: story.slug,
  }));
  // Note: Next.js will use this slug to generate the static paths
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

  // Create a shorter version of the title for metadata
  const shortTitle = story.title.length > 50 ? `${story.title.slice(0, 47)}...` : story.title;
  const shortDescription = story.quote.length > 150 ? `${story.quote.slice(0, 147)}...` : story.quote;

  return {
    title: `Shiny Dimes | ${shortTitle}`,
    description: shortDescription,
    openGraph: {
      title: `Shiny Dimes | ${shortTitle}`,
      description: shortDescription,
      type: 'article',
      authors: [story.author],
    },
  };
}
