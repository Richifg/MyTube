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
    return (
      <span className={`header-clock mx-2 ${md ? 'hidden-md-down' : null} ${sm ? 'hidden-md-up' : null}`}>
        {store.getTime12hFormat}
      </span>
    );
  }
}

export default Clock;
