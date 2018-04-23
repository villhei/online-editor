import axios from 'axios'
import { TextDocumentId } from 'service/document-service'

import {
  ApiResource,
  ApiResourceId,
  HasId,
  Map,
  Partial
} from './common'

export type FolderId = ApiResourceId

export type Folder = {
  readonly id: FolderId
  readonly name: string,
  readonly parent: FolderId,
  readonly children: FolderId[]
  readonly documents: TextDocumentId[]
}

export type PartialFolder = Partial<Folder>

export function isFolder(candidate: any): candidate is Folder {
  return Boolean(candidate &&
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    Array.isArray(candidate.documents) &&
    Array.isArray(candidate.children))
}

export function create(folder: PartialFolder): Promise<Folder> {
  return axios.post<Promise<Folder>>('/api/folders', folder
  ).then(response => response.data)
}

export function getRoot(): Promise<Folder> {
  return findByName('Root')
}

export function getByFolderId(folderId: FolderId): Promise<Folder> {
  return axios.get<Folder>('/api/folders/' + folderId)
    .then(res => res.data)
}

export function findByName(folderName: string): Promise<Folder> {
  return axios.get<Folder>('/api/folders/?find=' + folderName)
    .then(res => res.data)
}

export function findByParent(id: FolderId): Promise<Array<Folder>> {
  return axios.get<Array<Folder>>('/api/folders/?children=' + id)
    .then(res => res.data)
}

export function deleteByFolder(f: HasId): Promise<ApiResourceId> {
  return axios.delete('/api/folders/' + f.id).then(() => f.id)
}

export function deleteMultiple(items: Map<HasId>): Promise<Array<ApiResourceId>> {
  const folders: Array<Folder> = Object.keys(items)
    .map(id => (items[id] as Folder))
    .filter(d => isFolder(d))
  const deletions = folders.map(f => deleteByFolder(f))
  return Promise.all(deletions)
}
