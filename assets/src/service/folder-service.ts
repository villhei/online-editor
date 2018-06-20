import { TextDocumentId } from 'service/document-service'

import {
  ApiResourceId,
  HasId,
  Map,
  Partial,
  configureApiEndpoints
} from 'library/service/common'

export type FolderId = ApiResourceId

export type Folder = {
  readonly id: FolderId
  readonly name: string,
  readonly parent: FolderId,
  readonly children: FolderId[]
  readonly documents: TextDocumentId[],
  readonly inserted_at: string,
  readonly updated_at: string
}

export type PartialFolder = Partial<Folder>

export const endpoints = configureApiEndpoints<Folder>('/api/folders')

export const {
  create,
  getAll,
  update
} = endpoints

export function isFolder(object: Object | undefined): object is Folder {
  const candidate = object as (Folder | undefined)
  return Boolean(candidate &&
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    Array.isArray(candidate.documents) &&
    Array.isArray(candidate.children))
}

export function getRoot(): Promise<Folder> {
  return findByName('Root').then(([root]) => {
    return root || Promise.reject(new Error('Root folder not found'))
  })
}

export const getByFolderId = (folderId: FolderId): Promise<Folder> => endpoints.getById(folderId)

export function findByName(folderName: string): Promise<Array<Folder>> {
  return getAll({ query: { find: folderName } })
}

export function findByParent(id: FolderId): Promise<Array<Folder>> {
  return getAll({ query: { children: id } })
}

export const deleteByFolder = (f: Folder): Promise<ApiResourceId> => endpoints.deleteResource(f)

export function deleteMultiple(items: Map<HasId>): Promise<Array<ApiResourceId>> {
  const folders: Array<Folder> = Object.values(items)
    .map(item => (item as Folder))
    .filter(d => isFolder(d))
  const deletions = folders.map(f => deleteByFolder(f))
  return Promise.all(deletions)
}
