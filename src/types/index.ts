export interface Content {
  type: "text" | "video" | "audio" | "podcast";
  data: string;
}

export interface Lesson {
  title: string;
  description: string;
  topics: string[];
  content: Content[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

// types.ts (if you don't have it already)
export interface Course {
  id: number;
  title: string;
  description: string;
  modules: {
    title: string;
    lessons: {
      title: string;
      description: string;
      topics: string[];
      content: { type: string; data: string }[];
    }[];
  }[];
}