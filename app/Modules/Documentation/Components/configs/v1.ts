const config = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '(V3) Ripple10 API Documentation',
      version: '3.0.0',
      description: 'Ripple10 API Documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: [
    'app/modules/Documentation/**/*.yml',
    'app/modules/Authentication/**/*.yml',
    /* stream list */
    // 'app/modules/Streams/Controllers/GetStreamListSpecs.yml',
    // 'app/modules/Streams/Controllers/GetStreamListWithPaginationSpecs.yml',
    // 'app/modules/Streams/Controllers/GetStreamListPopularSpecs.yml',
    // 'app/modules/Streams/Controllers/GetStreamListForCorrectionSpecs.yml',
    /* timelines */
    // 'app/modules/Streams/Controllers/Timelines/GetStreamTimelineDailySentimentSpecs.yml',
    // 'app/modules/Streams/Controllers/Timelines/GetStreamTimelineHourlySentimentSpecs.yml',
    // 'app/modules/Streams/Controllers/Timelines/GetStreamTimelineMonthlySentimentSpecs.yml',
    /* summaries */
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalAllSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalbyEngagementsSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalBySentimentsSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalByUniqAuthorsSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalChannelByEngagementsSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalChannelByMentionSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalChannelByReachSpecs.yml',
    // 'app/modules/Streams/Controllers/Summaries/GetSummaryTotalChannelByUniqAuthorsSpecs.yml',
    // 'app/modules/Streams/Controllers/Tops/GetTopHashtagsSpecs.yml',
    // 'app/modules/Streams/Controllers/GetPotentialReachSpecs.yml',
    // 'app/modules/Streams/Controllers/GetStreamWordcloudSpecs.yml',
    'app/modules/Streams/Controllers/GetAverageDailyMentionSpecs.yml',
  ],
  basePath: '/',
}

export default config
