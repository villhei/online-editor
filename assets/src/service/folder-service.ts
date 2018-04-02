import axios from 'axios'
import { TextDocumentId } from 'service/document-service'
import { ApiResource } from './common'

export type FolderId = string

export type Folder = {
  readonly id: FolderId
  readonly name: string,
  readonly children: FolderId[]
  readonly documents: TextDocumentId[]
}

export type UpdatedStamp = {
  readonly updated_at: string
}

export function isFolder(candidate: ApiResource<Folder>): candidate is Folder {
  const folder = (candidate as Folder)
  return Boolean(folder &&
    folder.id &&
    folder.name &&
    Array.isArray(folder.children))
}

export function create(name: string, parent: FolderId): Promise<Folder> {
  return axios.post<Promise<Folder>>('/api/folders', {
    name,
    parent
  }).then(response => response.data)
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

export function getAll(): Promise<Array<Folder>> {
  return axios.get<Array<Folder>>('/api/folders').then(res => res.data)
}
