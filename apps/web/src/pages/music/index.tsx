import { GET_ALL_MUSIC_PROJECTS } from "lib/queries";
import { getClient } from 'lib/sanity.server';
import { Layout } from "components/layout";
import { PageTitle } from "components/page-title";
import { MetaHead } from "components/meta";
import styles from 'styles/pages/Music.module.scss'

import { MusicItem } from 'components/music'

export default function MusicPage({ data }) {

  const musicProjects = data.musicProjects.map((musicProject) => {
    return (
      <MusicItem
        link={musicProject.slug}
        title={musicProject.title}
        description={musicProject.description}
        image={musicProject.image}
        key={musicProject._id}
      />
    )
  })

  return (
    <Layout>
      <MetaHead
				title="Music"
				description="Music projects, ensembles, and current working groups."
				slug="music"
			/>
      <PageTitle title="🎵 Music" megaTitle="Music projects" />
      <section className={styles.outer}>
        {musicProjects}
      </section>
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