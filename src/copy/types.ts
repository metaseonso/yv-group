// The words of the film, one object per language. The film's beats live in src/film/beats.ts.
export type Lang = 'en' | 'pt' | 'uk' | 'ru';

export type Copy = {
  lang: Lang;
  /** The language's own name, for the switcher. */
  name: string;
  /** Short label for the switcher button. */
  short: string;
  title: string;
  description: string;
  scroll: string;
  skip: string;
  nav: string;
  lines: {
    seek: string;
    clear: [before: string, word: string, after: string];
    move: string;
    journeyA: string;
    journeyB: string;
    firstLaunch: string;
    celebration: string;
    partA: string;
    partB: string;
    crowd: string;
    gather: string;
    sky: string;
    steps: string;
    groove: string;
    reach: string;
    promise: string;
  };
  pass: { title: string; admit: string; night: string };
  cards: string[];
  guest: string;
  contact: { title: string; body: string; email: string };
  /** Shown in the footer while a group member has not yet written the language. Empty when final. */
  draftNote: string;
};
