import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@/common/(.*)': '<rootDir>/src/common/$1',
    '@/functions/(.*)': '<rootDir>/src/functions/$1',
    '@/middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@/services/(.*)': '<rootDir>/src/services/$1',
    '@/types/(.*)': '<rootDir>/src/common/types/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/models/(.*)': '<rootDir>/src/models/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
};

export default config;
