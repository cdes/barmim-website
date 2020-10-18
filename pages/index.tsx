import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedEpisodesData } from "../lib/episodes";
import Link from "next/link";
import Date from "../components/date";
import { EpisodeData } from "./[id]";
import ListenButton from "../components/listen-button";

interface HomeProps {
  allEpisodesData: EpisodeData[];
}

const PodcastChannels = [
  {
    text: "آبل بودكاست",
    url: "url",
    icon: (
      <img
        src="/podcast-platforms-logos/apple-podcast.svg"
        width={32}
        height={32}
      />
    ),
  },
  {
    text: "جوجل بودكاست",
    url: "url",
    icon: (
      <img
        src="/podcast-platforms-logos/google-podcast.svg"
        width={32}
        height={32}
      />
    ),
  },
  {
    text: "أوڤركاست",
    url: "url",
    icon: (
      <img src="/podcast-platforms-logos/overcast.svg" width={32} height={32} />
    ),
  },
  {
    text: "بوكت كاستس",
    url: "url",
    icon: (
      <img
        src="/podcast-platforms-logos/pocket-casts.svg"
        width={32}
        height={32}
      />
    ),
  },
  {
    text: "أنغامي",
    url: "url",
    icon: (
      <img src="/podcast-platforms-logos/anghami.svg" width={32} height={32} />
    ),
  },
  {
    text: "ديزر",
    url: "url",
    icon: (
      <img src="/podcast-platforms-logos/deezer.svg" width={32} height={32} />
    ),
  },
  {
    text: "كاسترو",
    url: "url",
    icon: (
      <img src="/podcast-platforms-logos/castro.svg" width={32} height={32} />
    ),
  },
  {
    text: "أنكور",
    url: "url",
    icon: (
      <img src="/podcast-platforms-logos/anchor.svg" width={32} height={32} />
    ),
  },
];

export default function Home({ allEpisodesData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="grid grid-cols-2 gap-4 mb-12">
        {PodcastChannels.map(({ text, icon, url }, index) => (
          <ListenButton key={index} text={text} url={url} icon={icon} />
        ))}
      </section>
      <section>
        <h2 className="text-2xl text-gray-700 mb-4">جميع الحلقات</h2>
        <ul>
          {allEpisodesData.map(({ id, date, title }) => (
            <li key={id} className="flex flex-col mb-4 last:mb-0">
              <Link href={`/${id}`}>
                <a className="text-indigo-500 font-medium">{title}</a>
              </Link>
              <Date dateString={date} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allEpisodesData = await getSortedEpisodesData();
  return {
    props: {
      allEpisodesData,
    },
  };
}