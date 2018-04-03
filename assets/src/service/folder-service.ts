import axios from 'axios'
import { TextDocumentId } from 'service/document-service'
import { ApiResource, ApiResourceId, Partial, UpdatedStamp } from './common'

export type FolderId = ApiResourceId

export type Folder = {
  readonly id: FolderId
  readonly name: string,
  readonly parent: FolderId,
  readonly children: FolderId[]
  readonly documents: TextDocumentId[]
}

export type PartialFolder = Partial<Folder>

export function isFolder(candidate: ApiResource<Folder>): candidate is Folder {
  const folder = (candidate as Folder)
  return Boolean(folder &&
    folder.id &&
    folder.name &&
    Array.isArray(folder.children))
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
