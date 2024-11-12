export type ITabsData = Record<
  string,
  {
    labels: ILabelsData[];
  }
>[];
export interface ILabelsData {
  title: string;
  description?: string;
  text?: string;
}
