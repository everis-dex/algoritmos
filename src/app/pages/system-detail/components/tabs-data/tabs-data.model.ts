export interface ITabData {
  id: number;
  tab: string;
  fields: IFieldData[];
}
export interface IFieldData {
  field: string;
  description?: {
    text: string;
    isVisible: boolean;
  };
  content?: string;
}
