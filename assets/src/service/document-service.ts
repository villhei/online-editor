import axios, { AxiosError } from 'axios'
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

export function isDocument (candidate: ApiResource<TextDocument>): candidate is TextDocument {
  const document = candidate as TextDocument
  return Boolean(document &&
    document.id &&
    document.name &&
    typeof document.content !== undefined &&
    document.owner &&
    document.inserted_at)
}

export function create (): Promise<TextDocument> {
  return axios.post<Promise<TextDocument>>('/api/documents', {
    content: '',
    owner: 'fooguy',
    name: 'new document'
  }).then(response => response.data)
}

function isAxiosError (err: any): err is AxiosError {
  return typeof (err as AxiosError).response !== 'undefined'
}

export function update (id: TextDocumentId, document: PartialTextDocument): Promise<TextDocument> {
  return axios.put<TextDocument>(`/api/documents/${id}?overwrite=false`, document)
    .then(res => res.data)
    .catch(err => {
      if (isAxiosError(err) && err.response && err.response.status === 409) {
        console.log('rejecting')
        return Promise.reject(new Error('An updated version of the document exists, please reload the document'))
      } else {
        return Promise.reject(err)
      }
    })
}

export function getAll (): Promise<Array<TextDocument>> {
  return axios.get<Array<TextDocument>>('/api/documents').then(res => res.data)
}

export function getById (id: TextDocumentId): Promise<TextDocument> {
  return axios.get<TextDocument>(`/api/documents/${id}`).then(res => res.data)
}

export function deleteById (id: TextDocumentId): Promise<void> {
  return axios.delete('/api/documents/' + id).then(res => res.data)
}
