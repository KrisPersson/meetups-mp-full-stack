export default {
  type: 'object',
  properties: {
    searchText: { type: 'string' },
  },
  required: ['searchText'],
} as const;
