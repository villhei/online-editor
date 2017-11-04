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

export function getAll(): Promise<Array<TextDocument>> {
  return axios.get<Array<TextDocument>>('/api/documents').then(response => response.data)
}

export function getById(id: number | string): Promise<TextDocument> {
  return axios.get<TextDocument>(`/api/documents/${id}`).then(response => response.data)
}