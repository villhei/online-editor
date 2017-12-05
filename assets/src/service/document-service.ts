import axios from 'axios'
import { AxiosResponse } from 'axios'
import { ApiResource } from './common'

export type TextDocumentId = string
export type TextDocument = {
  readonly id: TextDocumentId,
  readonly name: string,
  readonly content: string,
  readonly owner: string,
  readonly inserted_at: string,
  readonly updated_at: string
}

export type UpdatedStamp = {
  readonly updated_at: string
}
export type P<T> = {
  [P in keyof T]?: T[P]
}

export type PartialTextDocument = P<TextDocument> & UpdatedStamp

export function isDocument(candidate: ApiResource<TextDocument>): candidate is TextDocument {
  const document = <TextDocument>candidate
  return Boolean(document &&
    document.id &&
    document.name &&
    document.content &&
    document.owner &&
    document.inserted_at &&
    document.updated_at)
}

export function create(): Promise<TextDocument> {
  return axios.post<Promise<TextDocument>>('/api/documents', {
    content: '',
    owner: 'fooguy',
    name: 'new document'
  }).then(response => response.data)
}

export function update(id: TextDocumentId, document: PartialTextDocument): Promise<TextDocument> {
  return axios.put<TextDocument>(`/api/documents/${id}?overwrite=false`, document).then(res => res.data)
}

export function getAll(): Promise<Array<TextDocument>> {
  return axios.get<Array<TextDocument>>('/api/documents').then(res => res.data)
}

export function getById(id: TextDocumentId): Promise<TextDocument> {
  return axios.get<TextDocument>(`/api/documents/${id}`).then(res => res.data)
}

export function deleteById(id: TextDocumentId): Promise<void> {
  return axios.delete('/api/documents/' + id).then(res => res.data)
}
