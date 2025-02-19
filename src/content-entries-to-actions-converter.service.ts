import { ContentEntryDraft, ENTRY_EXTENSION } from '@contentlab/git-adapter'
import { stringify } from 'yaml'
import { AdditionModel } from './addition.model'
import { DeletionModel } from './deletion.model'

export class ContentEntriesToActionsConverterService {
  convert(
    contentEntries: ContentEntryDraft[],
    pathEntryFolder: string,
  ): {
    additions: AdditionModel[]
    deletions: DeletionModel[]
  } {
    const additions: AdditionModel[] = []
    const deletions: DeletionModel[] = []
    contentEntries.forEach((contentEntry) => {
      const entryPath = `${pathEntryFolder}/${contentEntry.id}${ENTRY_EXTENSION}`
      if (contentEntry.deletion) {
        deletions.push(new DeletionModel(entryPath))
      } else {
        additions.push(
          new AdditionModel(
            entryPath,
            stringify({
              metadata: contentEntry.metadata,
              data: contentEntry.data,
            }),
          ),
        )
      }
    })
    return {
      additions,
      deletions,
    }
  }
}
