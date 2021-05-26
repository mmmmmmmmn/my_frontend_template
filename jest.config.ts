import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: { '\\.[jt]sx?$': 'ts-jest' },
    verbose: true,
}

export default config
