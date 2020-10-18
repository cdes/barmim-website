import { EpisodeData } from "../pages/[id]";
import parser from "fast-xml-parser";

async function getEpisodes() {
  const rss = await fetch("https://anchor.fm/s/362b3898/podcast/rss");
  const xml = await rss.text();
  const json = parser.parse(xml) as PodcastJSON;
  const episodes = json.rss.channel.item;

  return episodes;
}

export async function getSortedEpisodesData() {
  const episodes = await getEpisodes();

  const allEpisodesData = episodes.map((episode) => {
    return {
      guid: episode.guid,
      id: episode["itunes:episode"],
      number: episode["itunes:episode"],
      summary: episode["itunes:summary"],
      description: episode.description,
      title: episode.title,
      date: episode.pubDate,
    };
  });

  // Sort posts by date
  return allEpisodesData.sort((a, b) => {
    if (a.number < b.number) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllEpisodeIds() {
  const episodes = await getEpisodes();
  return episodes.map((episode) => {
    return {
      params: {
        id: episode["itunes:episode"].toString(),
      },
    };
  });
}

export async function getEpisodeData(id: number) {
  const episodes = await getEpisodes();

  const episodeData = episodes.find((e) => e["itunes:episode"] == id);

  if (episodeData) {
    const title = episodeData.title;
    const date = episodeData.pubDate;
    const contentHtml = episodeData.description;

    // Combine the data with the id and contentHtml
    return {
      id: id.toString(),
      title,
      date,
      contentHtml,
    } as EpisodeData;
  } else {
    return null;
  }
}

export interface PodcastJSON {
  rss: RSS;
}

export interface RSS {
  channel: Channel;
}

export interface Channel {
  title: string;
  description: string;
  link: string;
  image: Image;
  generator: string;
  lastBuildDate: string;
  "atom:link": string[];
  author: string;
  copyright: string;
  language: string;
  "itunes:author": string;
  "itunes:summary": string;
  "itunes:type": string;
  "itunes:owner": ItunesOwner;
  "itunes:explicit": string;
  "itunes:category": ItunesCategory;
  "itunes:image": string;
  item: Item[];
}

export interface Image {
  url: string;
  title: string;
  link: string;
}

export interface ItunesOwner {
  "itunes:name": string;
  "itunes:email": string;
}

export interface ItunesCategory {
  "itunes:category": string;
}

export interface Item {
  title: string;
  description: string;
  link: string;
  guid: string;
  "dc:creator": string;
  pubDate: string;
  enclosure: string;
  "itunes:summary": string;
  "itunes:explicit": string;
  "itunes:duration": number;
  "itunes:image": string;
  "itunes:season": number;
  "itunes:episode": number;
  "itunes:episodeType": string;
}
