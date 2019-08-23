import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import { debounce } from '../../utils';

import { IYoutube } from '../../interfaces';

@inject('youtube')
@observer
class SearchBar extends React.Component<IYoutube> {
  @observable query: string;
  debouncedSearch: Function;

  constructor(props: any) {
    super(props);
    this.query = '';
    this.debouncedSearch = debounce(this.props.youtube.search, 1000);
  }

  updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.youtube.query = e.target.value;
    this.debouncedSearch();
  }

  render() {
    return(
      <InputGroup className="search-bar">
        <Input placeholder="Search" onChange={this.updateQuery}/>
        <InputGroupAddon addonType="append">
            <Button onClick={() => this.debouncedSearch()}>
              <FontAwesomeIcon icon="search" />
            </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchBar;
