export type ValidFilters = 'all' | 'completed' | 'pending';

export const parseValidFilter = (filter: string): ValidFilters => {
  switch (filter) {
    case 'all':
    case 'completed':
    case 'pending':
      return filter;
    default:
      return 'all';
  }
};
