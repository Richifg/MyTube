import * as React from 'react';

// A scrollable container where page content is displayed
const PageMain: React.FunctionComponent = ({ children }) => (
  <main className="main">
    {children}
  </main>
);

export default PageMain;
