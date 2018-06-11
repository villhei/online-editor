import { FolderId } from 'service/folder-service'

import {
  ApiResourceId,
  HasId,
  Map,
  Partial,
  configureApiEndpoints,
  isAxiosError
} from 'library/service/common'

export type TextDocumentId = ApiResourceId

export type TextDocument = {
  readonly id: ApiResourceId,
  readonly name: string,
  readonly content: string,
  readonly owner: string,
  readonly folder: string,
  readonly starred: boolean,
  readonly inserted_at: string,
  readonly updated_at: string
}

export type PartialTextDocument = Partial<TextDocument>

export function isDocument(object: Object | undefined): object is TextDocument {
  const candidate = object as TextDocument | undefined
  return Boolean(candidate &&
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.content === 'string')
}

export const endpoints = configureApiEndpoints<TextDocument>('/api/documents')

export const {
  create,
  getAll,
  getById,
  deleteResource
} = endpoints

export function update(id: ApiResourceId, document: PartialTextDocument): Promise<TextDocument> {
  return endpoints.update(id, document, { query: { overwrite: 'false' } })
    .catch(err => {
      if (isAxiosError(err) && err.response && err.response.status === 409) {
        return Promise.reject(new Error('An updated version of the document exists, please reload the document'))
      } else {
        return Promise.reject(err)
      }
    })
}

export function getAllByFolder(id: FolderId): Promise<Array<TextDocument>> {
  return getAll({ query: { folder: id } })
}

export const deleteByDocument = (d: TextDocument) => deleteResource(d)

export function deleteMultiple(items: Map<HasId>): Promise<ApiResourceId[]> {
  const documents: Array<TextDocument> = Object.values(items)
    .map(item => (item as TextDocument))
    .filter(d => isDocument(d))
  const deletions = documents.map(d => deleteResource(d))
  return Promise.all(deletions)
}
