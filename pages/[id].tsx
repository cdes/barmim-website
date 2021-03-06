import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Layout from "../components/layout";
import { getAllEpisodeIds, getEpisodeData } from "../lib/episodes";
import Head from "next/head";
import Date from "../components/date";
import ReactAudioPlayer from "react-audio-player";

export interface EpisodeData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
  audioUrl: string;
}

interface EpisodeProps {
  episodeData: EpisodeData | null;
}

export default function Episode({ episodeData }: EpisodeProps) {
  if (episodeData === null) {
    return (
      <Layout>
        <article>404</article>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>{episodeData.title}</title>
      </Head>
      <article className="episode">
        <h1>{episodeData.title}</h1>
        <div className="mb-4">
          <Date dateString={episodeData.date} />
        </div>
        <ReactAudioPlayer
          src={episodeData.audioUrl}
          controls
          preload="none"
          className="w-full focus:outline-none my-8"
        />
        <div dangerouslySetInnerHTML={{ __html: episodeData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllEpisodeIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const episodeData = await getEpisodeData(params?.id as string);
  return {
    props: {
      episodeData,
    },
  };
};
