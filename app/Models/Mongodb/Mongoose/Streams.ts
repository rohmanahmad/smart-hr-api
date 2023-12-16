import mongoose from 'mongoose'
import AdonisMongoose from '@ioc:Provider/Mongoose'

type EmotionValue = {
  total: number
}
type OceanValue = {
  total: number
}
export interface StreamsInterface {
  _id: string
  hashuniqeid: string
  keyword: number
  client: number
  date: Date
  sentiment: {
    value: number
    status?: boolean
    automatic_at?: string
    positive_keywords?: Array<string>
    negative_keywords?: Array<string>
  }
  service: string
  source: string
  stream_id: string
  text: string
  user: {
    id: string
    name: string
    real_name: string
    profile: string
    avatar: string
    gender?: string
    location?: string
    is_verified?: boolean
    is_private?: boolean
    bio?: string
    follower?: {
      status: true
      count: number
    }
    post?: {
      status: true
      count: number
    }
    following?: {
      status: true
      count: number
    }
    is_r10_official?: boolean
  }
  post_detail?: {
    shares: number
    likes: number
    comments: number
    views: number
  }
  content_hash?: string
  // raw_data?: {}
  // optionals
  emotion?: {
    detail?: {
      angger: EmotionValue
      anticipation: EmotionValue
      sad: EmotionValue
      joy: EmotionValue
      fear: EmotionValue
      trust: EmotionValue
      suprise: EmotionValue
      disgusting: EmotionValue
    }
    version: string
  }
  ocean?: {
    detail: {
      o: OceanValue
      c: OceanValue
      e: OceanValue
      a: OceanValue
      n: OceanValue
    }
    version: string
  }
  gender_analytics: {
    by_name?: {
      status?: boolean
      analyze_at?: Date
      value?: string
      engine_version: string
      detail: object
    }
  }
  brand?: number
  campaign?: number
  description?: string
  image?: string
  likes?: number
  links?: []
  query?: Array<string>
  timestamp?: Date
  title?: string
  is_trash?: Boolean
  trashed?: {}
  tags?: Array<string>
  logs?: []
  crawler?: {
    build_version?: string
    ip?: string
    name?: string
    version?: string
  }
  engagement: number
  reach: number
  created_at: Date
  updated_at: Date
}

const Schema = new mongoose.Schema({
  // required
  hashuniqeid: String, // meski namanya uniq, tp datanya tidak uniq
  keyword: Number,
  client: Number,
  sentiment: {},
  service: String,
  source: String,
  stream_id: String,
  text: String,
  user: {},
  content_hash: String, // hash dari text
  date: Date,
  raw_data: {},
  // optionals
  brand: Number,
  campaign: Number,
  description: String,
  image: String,
  likes: Number,
  links: [],
  query: String,
  timestamp: Date,
  title: String,
  is_trash: Boolean,
  trashed: {},
  tags: [],
  logs: [],
})
Schema.index(
  {
    keyword: 1,
    date: -1,
    service: 1,
    is_trash: 1,
  },
  {
    name: 'standart-query-1',
  }
)

export const Model = AdonisMongoose.model('MongooseStreams', Schema, 'streams')
