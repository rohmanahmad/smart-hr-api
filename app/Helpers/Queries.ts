export const getGroupingByChannels = function (key: string = '$service') {
  return {
    service: {
      $cond: {
        if: {
          $in: [key, ['blogs', 'forums']],
        },
        then: 'blogs_forums',
        else: {
          $cond: {
            if: {
              $eq: [key, 'google_alerts'],
            },
            then: 'news',
            else: key,
          },
        },
      },
    },
  }
}

export const getGroupingBySentiments = function (key: string = '$service') {
  return {
    sentiment: {
      $cond: {
        if: {
          $gt: [key, 0],
        },
        then: 'positive',
        else: {
          $cond: {
            if: {
              $lt: [key, 0],
            },
            then: 'negative',
            else: 'neutral',
          },
        },
      },
    },
  }
}
