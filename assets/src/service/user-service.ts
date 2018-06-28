import axios from 'axios'
import {
  ApiResourceId,
  Partial
} from 'library/service/common'
import { FolderId } from 'service/folder-service'

export type UserId = ApiResourceId

export type User = {
  readonly id: UserId
  readonly firstName: string,
  readonly lastName: string,
  readonly avatar: string,
  readonly email: string,
  readonly rootFolder: FolderId
}

export type PartialUser = Partial<User>

export function isFolder(object: Object | undefined): object is User {
  const candidate = object as (User | undefined)
  return Boolean(candidate &&
    typeof candidate.id === 'string' &&
    typeof candidate.firstName === 'string' &&
    typeof candidate.lastName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.avatar === 'string' &&
    typeof candidate.rootFolder === 'string')
}

export function getCurrentUser(): Promise<User> {
  return axios.get<User>('/api/users/current').then(res => res.data)
}
