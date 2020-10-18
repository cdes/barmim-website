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
    url:
      "https://podcasts.apple.com/sa/podcast/%D8%A8%D9%88%D8%AF%D9%83%D8%A7%D8%B3%D8%AA-%D8%A8%D8%B1%D9%85%D9%8A%D9%85-barmim-podcast/id1531582080",
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
    url:
      "https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8zNjJiMzg5OC9wb2RjYXN0L3Jzcw",
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
    url: "https://overcast.fm/itunes1531582080/barmim-podcast",
    icon: (
      <img src="/podcast-platforms-logos/overcast.svg" width={32} height={32} />
    ),
  },
  {
    text: "بوكت كاستس",
    url: "https://pca.st/itunes/1531582080",
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
    url: "https://play.anghami.com/album/1014884467",
    icon: (
      <img src="/podcast-platforms-logos/anghami.svg" width={32} height={32} />
    ),
  },
  {
    text: "ديزر",
    url: "https://www.deezer.com/en/show/1757812",
    icon: (
      <img src="/podcast-platforms-logos/deezer.svg" width={32} height={32} />
    ),
  },
  {
    text: "كاسترو",
    url: "https://castro.fm/podcast/dfcfcfce-8114-42a1-ba19-e9614a5adc88",
    icon: (
      <img src="/podcast-platforms-logos/castro.svg" width={32} height={32} />
    ),
  },
  {
    text: "أنكور",
    url: "https://anchor.fm/barmim",
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
      <section className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-12">
        {PodcastChannels.map(({ text, icon, url }, index) => (
          <ListenButton key={index} text={text} url={url} icon={icon} />
        ))}
      </section>
      <section>
        <h2 className="text-2xl text-gray-700 mb-4">الحلقات</h2>
        <ul>
          {allEpisodesData.map(({ id, date, title }) => (
            <li key={id} className="flex flex-col mb-8 last:mb-0">
              <Link href={`/${id}`}>
                <a className="text-barmim-500 font-medium">{title}</a>
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
