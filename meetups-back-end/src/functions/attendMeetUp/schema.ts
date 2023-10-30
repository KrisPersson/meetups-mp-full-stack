export default {
  type: 'object',
  properties: {
    meetupId: { type: 'string' },
  },
  required: ['meetupId'],
} as const;
