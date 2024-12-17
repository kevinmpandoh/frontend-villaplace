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
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Folder yang tidak perlu diuji
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Format ekstensi file yang didukung
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Folder __tests__ di dalam folder utama
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};

export default createJestConfig(customJestConfig);
