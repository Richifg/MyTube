import * as React from 'react';
import { observer } from 'mobx-react';
import ClockStore from '../../stores/ClockStore';

interface IClockProps {
  store: ClockStore;
  sm?: boolean;
  md?: boolean;
  [propName: string]: any;
}

@observer
class Clock extends React.Component<IClockProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { store, sm, md } = this.props;
    /*
      to make it seems as though the clock is always on the top right position of the
      navbar, two clocks (one hidden when the other is visible) had to be inserted at
      different parts of the layout because of the way bootrap collapsable navbar works
    */

    return (
      <span className={`header-clock mx-2 ${md ? 'hidden-md-down' : null} ${sm ? 'hidden-md-up' : null}`}>
        {store.getTime12hFormat}
      </span>
    );
  }
}

export default Clock;
