import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import { debounce } from '../../utils';

interface ISearch {
  search: (query: string) => void;
}

@observer
class SearchBar extends React.Component<ISearch> {
  @observable query: string;
  debouncedSearch: Function;

  constructor(props: any) {
    super(props);
    this.query = '';
    this.debouncedSearch = debounce(this.props.search, 500);
  }

  updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.query = e.target.value;
    this.debouncedSearch(this.query);
  }

  render() {
    return(
      <InputGroup className="search-bar">
        <Input placeholder="Search" onChange={this.updateQuery}/>
        <InputGroupAddon addonType="append">
            <Button onClick={() => this.debouncedSearch(this.query)}>
              <FontAwesomeIcon icon="search" />
            </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchBar;
