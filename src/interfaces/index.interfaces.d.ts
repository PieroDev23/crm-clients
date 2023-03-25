export interface IClient {
  id?: number;
  name: string;
  tel: number;
  email: string;
  company: string;
  notes?: string
}

export interface ClientNew extends IClient {
  notes: string;
}
