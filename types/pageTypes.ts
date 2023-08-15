import { Service } from "./serviceTypes";

export type AppBarListing = {
  name: string;
  link: string;
};

export type Section = {
  SectionType: "List" | "Paragraph" | "Service";
  SectionHeader: string;
  SectionParagraphsOrEntries: Array<string | Section | Service>;
  NoteText?: {
    BoldText: string;
    Note: string;
  };
};
export type Page = {
  PageTitle: string;
  SubTitle?: string;
  Sections: Section[];
  PageKey: string;
};

export type Notice = {
  Note: string;
  BoldText: string;
};

export type SectionEntry = {
  SectionType: "List" | "Paragraph" | "Service" | "Notice";
  SectionContent: string | Service[] | Notice | string[];
};

export type SectionV2 = {
  SectionHeader: string;
  SectionEntries: SectionEntry[];
};

export type PageV2 = {
  PageTitle: string;
  SubTitle?: string;
  Sections: SectionV2[];
  PageKey: string;
};
