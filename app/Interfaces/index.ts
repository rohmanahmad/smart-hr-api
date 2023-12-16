import { ServiceCategories } from './Channels'
// import { AvailablePages } from './Pages'

export interface AuthUser {
  userId: number
  userPhone: string
  userCompany: string
  userAddress: string
  userName: string
  userFullname: string
  userEmail: string
  userPassword: string
  userPhoto: string
  userGroup: number
  userClient: number
  userStatus: number
  userVerification: string
  timeAdd: string
  timeUpdate: string
  userAdd: string
  userUpdate: string
  userLogindate: string
  appId: number
  isTrash: number
  userKeyword: string
  tokenExpired: number
}

export interface ServiceObject {
  id: number
  name: string
  title: string
  baseColor: string
  baseIcon: string
  items: Array<string>
}

export interface PackageRestrictionFormatted {
  clientId: number
  keywordLeft: number
  channels: ServiceCategories[]
  pages: Array<string>
  ownedProjects: Array<ProjectDetail>
  comparisonProjects: Array<ProjectDetail>
  dateLimit?: Date
}

export interface ProjectDetail {
  keyId: number
  clientId?: number
  keyName: string
  keyColor?: string
  keyLang?: string
  keyWord?: Array<string>
  keyInclude?: Array<string>
  keyExclude?: Array<string>
  keyPositive?: Array<string>
  keyNegative?: Array<string>
  keySociomileId?: number
  temporaryToken?: string
  keyIsCC?: boolean
  keyIsBuzzerTracking?: boolean
  keyIsPRDashboard?: boolean
  keyIsHealthIndex?: boolean
}

export interface ProjectsAndComparedProjectByUser {
  ownedProjects: Array<ProjectDetail>
  comparisonProjects: Array<ProjectDetail>
}

export type ObjectCompare = {
  total: number
  percentage: number
  direction: 'up' | 'down' | '-'
}

export type Channels = {
  twitter: number
  facebook: number
  instagram: number
  youtube: number
  tiktok: number
  news: number
  blogs_forums: number
}

export type CompareChannels = {
  twitter: ObjectCompare
  facebook: ObjectCompare
  instagram: ObjectCompare
  youtube: ObjectCompare
  tiktok: ObjectCompare
  news: ObjectCompare
  blogs_forums: ObjectCompare
}
