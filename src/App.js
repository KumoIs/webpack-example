import React, { useEffect } from 'react';

import { add, asyncImportComponent } from './utils/utils';

const App = () => {

  useEffect(() => {
    asyncImportComponent()
  })

  return (
    <div>
      APP
      { add(1, 2 ) }
    </div>
  )
}

export default App;