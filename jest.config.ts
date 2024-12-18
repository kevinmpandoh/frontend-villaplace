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
    // Hapus jika ingin di test
    '!src/app/**/*',
    '!src/app/(user)/**/*',
    '!src/app/auth/**/*',
    '!src/app/dashboard/**/*',
    '!src/components/Admin/**/*',
    '!src/components/Auth/**/*',
    '!src/components/Booking/**/*',
    '!src/components/BookingAdmin/**/*',
    '!src/components/BookingOwner/**/*',
    '!src/components/BookingUser/**/*',
    '!src/components/Change-password/**/*',
    '!src/components/Chart/**/*',
    '!src/components/DetailVilla/**/*',
    '!src/components/Favorite/**/*',
    '!src/components/Mitra/**/*',
    '!src/components/Payment/**/*',
    '!src/components/Payment/PaymentAdmin/**/*',
    '!src/components/Payment/PaymentMitra/**/*',
    '!src/components/Payment/PaymentUser/**/*',
    '!src/components/Profile/**/*',
    '!src/components/Sidebar/**/*',
    // Hapus sampai sini jika ada file yang ingin di test
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
