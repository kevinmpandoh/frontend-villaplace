import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  clearMocks: true, // Membersihkan mock state sebelum setiap pengujian
  collectCoverage: true, // Mengaktifkan pengumpulan coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/pages/**/*.tsx',
    '!src/_app.tsx',
    '!src/_document.tsx',
    '!src/hooks/**/*',
    '!src/services/**/*',
    '!src/types/**/*',
    '!src/utils/**/*',
    '!src/validations/**/*',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom', // Menggunakan jsdom sebagai lingkungan pengujian (untuk DOM)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Konfigurasi tambahan sebelum setiap pengujian
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    '^next/link$': '<rootDir>/__mocks__/next/link.ts',
    '^@testing-library/(.*)$': '<rootDir>/node_modules/@testing-library/$1',
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [ // Folder yang tidak perlu diuji
    '/node_modules/', 
    '/.next/',
    '/.vercel/',
    '/.nuxt/',
    '/.out/',
    '/__tests__/__mocks__/',
    '/src/hooks/',
    '/src/services/',
    '/src/types/',
    '/src/utils/',
    '/src/validations/',
  ], 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Format ekstensi file yang didukung
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};

export default createJestConfig(customJestConfig);
