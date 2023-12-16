import { Model as StreamModel } from 'App/Models/Mongodb/Mongoose/Streams'

export default class StreamService {
  public getModel(): typeof StreamModel {
    return StreamModel
  }

  public async aggregate(arrAggregate: Array<any>): Promise<Array<typeof StreamModel>> {
    try {
      const data = await StreamModel.aggregate(arrAggregate)
      return data
    } catch (err) {
      throw err
    }
  }

  public async getSummaryTotalOfStreams(criteria: object) {
    try {
      const aggregate: Array<any> = []
      aggregate.push({ $match: criteria })
      aggregate.push({
        $group: {
          _id: 'total',
          total: {
            $sum: 1,
          },
          totalLikes: {
            $sum: '$post_detail.likes',
          },
          totalShares: {
            $sum: '$post_detail.shares',
          },
          totalComments: {
            $sum: '$post_detail.comments',
          },
          totalEngagement: {
            $sum: '$engagement',
          },
        },
      })
      const data = await this.aggregate(aggregate)
      return data
    } catch (err) {
      throw err
    }
  }

  public async getTotalStreams(criteria: object) {
    try {
      const total = await StreamModel.countDocuments(criteria)
      return total
    } catch (err) {
      throw err
    }
  }

  public async getPopularStreams(criteria: object, limit: number) {
    try {
      const aggregate: Array<any> = []
      aggregate.push({ $match: criteria })
      aggregate.push({
        $project: {
          interactions: {
            $add: ['$post_detail.likes', '$post_detail.comments', '$post_detail.shares'],
          },
          keyword: 1,
          date: 1,
          sentiment: 1,
          service: 1,
          source: 1,
          stream_id: 1,
          text: 1,
          user: 1,
          post_detail: 1,
          emotion: 1,
          ocean: 1,
          gender_analytics: 1,
          image: 1,
          query: 1,
        },
      })
      aggregate.push({
        $sort: {
          interactions: -1,
        },
      })
      if (limit) aggregate.push({ $limit: limit })
      const data = await this.aggregate(aggregate)
      return data
    } catch (err) {
      throw err
    }
  }

  public async getTotalDocuments(criteria: object): Promise<number> {
    try {
      const data = await StreamModel.countDocuments(criteria)
      return data
    } catch (err) {
      throw err
    }
  }
}
