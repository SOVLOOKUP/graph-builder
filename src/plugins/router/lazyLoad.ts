const lazyLoadView =
  (loading?: typeof import('*.vue'), error?: typeof import('*.vue')) =>
  (
    AsyncView: Promise<typeof import('*.vue')>
  ): Promise<typeof import('*.vue')> => {
    return AsyncView
  }

export default lazyLoadView
