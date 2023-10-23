import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'PUT',
        path: '/api/meetups/{meetupId}',
      },
    },
  ],
};
