export interface AlgorithmicSystemCard {
  id: number;
  state: string;
  title: string;
  description: string;
  categoryChips: string[];
  tags?: string[];
}

export interface TopicCard {
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
}
