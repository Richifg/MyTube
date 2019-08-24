import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

import PageHeader from '../components/presentational/PageHeader';

const NoMatchPage = () => (
  <React.Fragment>
    <PageHeader />
    <Container fluid className="py-5 text-center">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-danger">404</h1>
        </Col>
        <Col xs={12}>
          <h3 className="text-light">Oops! Page not found</h3>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default NoMatchPage;
