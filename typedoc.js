module.exports = {
  out: "./docs",
  exclude: [
    '**/*.spec.ts',
    '**/index.ts',
    'src/logger.ts',
    'src/core/**/*.ts',
    'src/utils/**/*.ts'
  ],
  ignoreCompilerErrors: true,
  excludeExternals: true,
  excludePrivate: true,
  excludeNotExported: true,
  excludeExternals: true,
  preserveConstEnums: true
}