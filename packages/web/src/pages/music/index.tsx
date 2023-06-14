import Link from 'next/link'
import { GET_ALL_MUSIC_PROJECTS } from "lib/queries";
import { getClient } from 'lib/sanity.server';
import { linkResolver } from "utils/linkResolver";
import { Layout } from "components/layout";
import { PageTitle } from "components/page-title";
import { MetaHead } from "components/meta";

export default function MusicPage({ data }) {

  console.log(data)

  const musicProjects = data.musicProjects.map(musicProject => {
    return (
      <Link
        href={linkResolver('musicProject', musicProject.slug)}
        key={musicProject._id}
      >
        {musicProject.title}
      </Link>
    )
  })

  return (
    <Layout>
      <MetaHead
				title="Music"
				description="Music projects, ensembles, and current working groups."
				slug="music"
			/>
      <PageTitle title="🎵 Music Projects" megaTitle="Music" />
      {musicProjects}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
	const musicProjects = await getClient(preview).fetch(GET_ALL_MUSIC_PROJECTS);

	return {
		props: {
			preview,
			data: { musicProjects },
		},
		revalidate: 60,
	};
}