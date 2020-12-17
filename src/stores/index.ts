import globalModel from '@stores/global.store';

export const models = [globalModel];

export type RootState = {
  global: typeof globalModel.state,
};
