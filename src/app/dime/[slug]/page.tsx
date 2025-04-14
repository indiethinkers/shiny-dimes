import { Metadata } from 'next';
import { fetchStoriesData } from '@/app/actions';
import type { Story } from '@/types';
import ClientPage from './client-page';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: PageProps) {
  return <ClientPage slug={params.slug} />;
}

export async function generateStaticParams() {
  const stories = await fetchStoriesData();
  return stories.map((story: Story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const stories = await fetchStoriesData();
  const story = stories.find((s: Story) => s.slug === params.slug);
  
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
