import { EpisodeData } from "../pages/[id]";
import RSSParser from "rss-parser";
const parser = new RSSParser();

async function getEpisodes() {
  const rss = await parser.parseURL("https://anchor.fm/s/362b3898/podcast/rss");
  const json = (rss as unknown) as PodcastJSON;
  const episodes = json.items;

  return episodes;
}

export async function getSortedEpisodesData() {
  const episodes = await getEpisodes();

  const allEpisodesData = episodes.map((episode) => {
    return {
      guid: episode.guid,
      id: episode.itunes.episode,
      number: episode.itunes.episode,
      summary: episode.itunes.summary,
      description: episode.content,
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
        id: episode.itunes.episode.toString(),
      },
    };
  });
}

export async function getEpisodeData(id: string) {
  const episodes = await getEpisodes();

  const episodeData = episodes.find((e) => e.itunes.episode === id);

  if (episodeData) {
    const title = episodeData.title;
    const date = episodeData.pubDate;
    const contentHtml = episodeData.content;
    const audioUrl = episodeData.enclosure.url;

    // Combine the data with the id and contentHtml
    return {
      id: id.toString(),
      title,
      date,
      contentHtml,
      audioUrl,
    } as EpisodeData;
  } else {
    return null;
  }
}

export interface PodcastJSON {
  items: Item[];
  feedUrl: string;
  image: Image;
  creator: string;
  title: string;
  description: string;
  author: string;
  generator: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  itunes: Itunes2;
}

export interface Item {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  enclosure: Enclosure;
  "dc:creator": string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  itunes: Itunes;
}

export interface Enclosure {
  url: string;
  length: string;
  type: string;
}

export interface Itunes {
  summary: string;
  explicit: string;
  duration: string;
  image: string;
  episode: string;
  season: string;
}

export interface Image {
  link: string;
  url: string;
  title: string;
}

export interface Itunes2 {
  owner: Owner;
  image: string;
  categories: string[];
  author: string;
  summary: string;
  explicit: string;
}

export interface Owner {
  name: string;
  email: string;
}
