import { sanityClient } from "utils/sanity/sanityClient";
import { GET_ALL_MUSIC_PROJECTS } from "lib/queries";
import { PageTitle } from "components/page-title";
import styles from 'styles/pages/Music.module.scss';
import { MusicItem } from 'components/music';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music | Jory Tindall',
    description: 'Music projects, ensembles, and current working groups.',
}

export default async function MusicPage() {

    const musicProjects = await sanityClient.fetch(GET_ALL_MUSIC_PROJECTS);

    const musicItems = musicProjects.map((musicProject) => {
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
        <>
            <PageTitle title="🎵 Music" megaTitle="Music projects" />
            <section className={styles.outer}>
                {musicItems}
            </section>
        </>
    )
}