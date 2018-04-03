import axios from 'axios'
import { ApiResource, ApiResourceId, isAxiosError, Partial, UpdatedStamp } from './common'
import { FolderId } from 'service/folder-service'

export type TextDocumentId = ApiResourceId

export type TextDocument = {
  readonly id: TextDocumentId,
  readonly name: string,
  readonly content: string,
  readonly owner: string,
  readonly folder: string,
  readonly inserted_at: string,
  readonly updated_at: string
}

export type PartialTextDocument = Partial<TextDocument> & UpdatedStamp

export function isDocument(candidate: ApiResource<TextDocument>): candidate is TextDocument {
  const document = candidate as TextDocument
  return Boolean(document &&
    document.id &&
    document.name &&
    typeof document.content !== undefined &&
    document.owner &&
    document.inserted_at)
}

export function create(folder: FolderId): Promise<TextDocument> {
  return axios.post<Promise<TextDocument>>('/api/documents', {
    content: '',
    owner: 'fooguy',
    name: 'new document',
    folder
  }).then(response => response.data)
}

export function update(id: TextDocumentId, document: PartialTextDocument): Promise<TextDocument> {
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

export function getAllByFolder(id: FolderId): Promise<Array<TextDocument>> {
  return axios.get<Array<TextDocument>>('/api/documents?folder=' + id)
    .then(res => res.data)
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
