import { SortableKeysOf } from 'library/service/common'
import { TextDocument } from 'service/document-service'
import { Folder } from 'service/folder-service'

export type SortableKeys = SortableKeysOf<Folder> & SortableKeysOf<TextDocument>
