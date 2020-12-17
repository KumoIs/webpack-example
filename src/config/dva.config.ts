import { create } from 'dva-core-ts';
import createLading from 'dva-loading-ts';

import { models } from '@/stores';

// 创建 dva 实例
const app = create();

// 引入各各模块数据
models.forEach((model) => app.model(model));

// 引入 dva-loading
app.use(createLading());

// 启动 dva
app.start();

// 导出 dva 数据
export default app._store;
