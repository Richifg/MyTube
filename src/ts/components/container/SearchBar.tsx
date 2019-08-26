import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Spinner,
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
    this.debouncedSearch = debounce(this.props.youtube.search, 750, this.props.youtube);
  }

  updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.query = e.target.value;
    this.debouncedSearch(this.query);
  }

  render() {
    return(
      <InputGroup className="search-bar">
        <Input placeholder="Search" onChange={this.updateQuery} value={this.query}/>
        <InputGroupAddon addonType="append">
            <Button onClick={() => this.props.youtube.search(this.query)}>
              {this.props.youtube.isLoading
                ? <Spinner size="sm" />
                : <FontAwesomeIcon icon="search" />
              }
            </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchBar;
