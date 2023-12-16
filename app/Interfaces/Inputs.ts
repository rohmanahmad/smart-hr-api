import { ServiceCategories } from './Channels'

export type FilterInput = {
  project?: string
  since?: string
  until?: string
  service_category?: string
  section?: string
  author?: string
  username?: string
  domain?: string
  taging?: string
  q?: string
  filterbot?: string
  timesince?: string
  timeuntil?: string
  locations?: string
  location_kab_kota?: string
  type?: string
  compare?: string
}

type PaginationInput = {
  limit?: string
  page?: string
}

type ExtraInput = {
  group_service?: string
  filter_by?: 'mention' | 'reach' | 'engagement' | 'uniqe_author'
  show_total?: string
}

export type AvailableInput = FilterInput & PaginationInput & ExtraInput

export interface ValidInput {
  project?: Array<number>
  since?: Date
  until?: Date
  serviceCategory?: ServiceCategories[]
  section?: Array<string>
  author?: Array<string>
  username?: Array<string>
  domain?: Array<string>
  taging?: Array<string>
  q?: string
  filterbot?: boolean
  locations?: Array<string>
  locationKabKota?: Array<string>
  type?: string
  groupService?: boolean
  filterBy?: string
  showTotal?: boolean
  limit?: number
  skip?: number
  page?: number
  compare?: boolean
}
