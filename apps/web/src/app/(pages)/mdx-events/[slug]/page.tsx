export default async function MDXEvent({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const { default: MDXEvent } = await import(`../../../../content/events/${slug}.mdx`);
  
  return <MDXEvent />;
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }];
}

export const dynamicParams = false