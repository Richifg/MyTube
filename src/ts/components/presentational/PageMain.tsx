import * as React from 'react';

// A scrollable container where page content is displayed
const PageMain: React.FunctionComponent = ({ children }) => (
  <main className="main px-2">
      <div className="scroll-y">
        {children}
      </div>
  </main>
);

export default PageMain;
