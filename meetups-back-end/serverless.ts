import type { AWS } from '@serverless/typescript';
import {
  attendMeetUp,
  createMeetUp,
  getUpcomingMeetUps,
  leaveMeetUp,
  login,
  profile,
  signup,
  submitReview,
} from '@functions/index';
import Tables from 'src/yaml/dynamoDB';
const serverlessConfiguration: AWS = {
  service: 'meetups-back-end',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    stage: 'dev',
    name: 'aws',
    region: 'eu-north-1',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    profile: '${env:PROFIlE}',
    iam: {
      role: '${env:ROLE}',
    },
    environment: {
      TABLE: 'Meetups',
      JWT_SECRET: '${env:JWT_SECRET}',
    },
    httpApi: {
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    },
  },
  useDotenv: true,
  // import the function via paths
  functions: {
    attendMeetUp,
    createMeetUp,
    getUpcomingMeetUps,
    leaveMeetUp,
    login,
    profile,
    signup,
    submitReview,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 15,
    },
  },
  resources: {
    Resources: Tables,
  },
};

module.exports = serverlessConfiguration;
