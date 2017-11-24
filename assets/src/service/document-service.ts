import axios from 'axios'
import { AxiosResponse } from 'axios'

export type TextDocumentId = string
export type TextDocument = {
  readonly id: TextDocumentId,
  readonly name: string,
  readonly content: string,
  readonly owner: string,
  readonly inserted_at: string,
  readonly updated_at: string
}

export function create(): Promise<TextDocument> {
  return axios.post<Promise<TextDocument>>('/api/documents', {
    content: '',
    owner: 'fooguy',
    name: 'new document'
  }).then(response => response.data)
}

export function update(document: TextDocument): Promise<TextDocument> {
  return axios.put<TextDocument>('/api/documents/' + document.id, document).then(res => res.data)
}

export function getAll(): Promise<Array<TextDocument>> {
  return axios.get<Array<TextDocument>>('/api/documents').then(res => res.data)
}

export function getById(id: number | string): Promise<TextDocument> {
  return axios.get<TextDocument>(`/api/documents/${id}`).then(res => res.data)
}