import * as React from 'react';

// A scrollable container where page content is displayed
const PageMain: React.FunctionComponent = ({ children }) => (
  <main className="main">
      <div className="scroll-y w-100">
        {children}
      </div>
  </main>
);

export default PageMain;
