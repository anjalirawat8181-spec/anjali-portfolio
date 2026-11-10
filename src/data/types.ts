export type LensId = 'all' | 'sde' | 'analyst' | 'product' | 'marketing'
export type LensFilter = Exclude<LensId, 'all'>
