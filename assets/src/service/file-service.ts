import { MOCK_FILES } from 'mocks/files'

export type File = {
  name: string, content: string
}

export function getFileByName(fileName: string): File | null {
  const file = MOCK_FILES.find(file => file.name === fileName)
  return file || null
}
