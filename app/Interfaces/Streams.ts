type FollowerFollowingObject = {
  status?: boolean
  count?: number
}

type SentimentObject = {
  value: number
  status?: boolean
  automatic_at?: string
  positive_keywords?: Array<string>
  negative_keywords?: Array<string>
}
type PostDetailObject = {
  views?: number
  likes?: number
  comments?: number
  shares?: number
}

export type UserObject = {
  id: string
  name: string
  real_name: string
  profile: string
  avatar: string
  gender?: string
  following?: FollowerFollowingObject
  follower?: FollowerFollowingObject
}

export type StreamObject = {
  _id: string
  text: string
  keyword: number
  user: UserObject
  image?: string
  stream_id: string
  client: number
  source: string
  service: string
  date: Date
  raw_data?: object
  geo_detail?: object
  sentiment: SentimentObject
  post_detail: PostDetailObject
  reach: number
  engagement: number
  date_format: string
}

export interface ValidMatch {
  'keyword': {
    $nin?: Array<number>
    $in?: Array<number>
    $eq?: number
  }
  'date': {
    $lte?: Date
    $gte?: Date
    $eq?: Date
  }
  'service': {
    $nin?: Array<string>
    $in?: Array<string>
    $eq?: string
  }
  'is_trash': {
    $ne?: boolean
    $eq?: boolean
  }
  'sentiment.value'?: {
    $in: Array<number>
  }
  'text'?: {
    $in?: Array<RegExp>
    $all?: Array<RegExp>
    $nin?: Array<RegExp>
  }
  'hashtags'?: {
    $in: Array<string>
  }
  'tags'?: {
    $in: Array<string>
  }
  'user.real_name'?: {
    $in?: Array<string>
  }
  'user.name'?: {
    $in?: Array<string> // used for include specific authors
    $nin?: Array<string> // used for exclude authors / bot
  }
  'source'?: {
    $in: Array<RegExp>
    $nin: Array<RegExp> // dipakai jika client menambahkan tanda mines (-) pada depan search domain
  }
  'geo_detail.kab_id'?: {
    $in: Array<string>
  }
  'geo_detail.prov_id'?: {
    $in: Array<string>
  }
}
