import EnExcluded from './components/En-Excluded'
import IdExcluded from './components/Id-Excluded'
import uniq from 'lodash.uniq'

export const AllExcludedWords = uniq(EnExcluded.concat(IdExcluded))
