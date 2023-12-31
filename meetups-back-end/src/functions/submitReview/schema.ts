export default {
  type: 'object',
  properties: {
    reviewing: {
      type: 'string',
    },
    rating: {
      type: 'number',
    },
    meetupId: { type: 'string' },
  },
  required: ['reviewing', 'rating', 'meetupId'],
} as const;
