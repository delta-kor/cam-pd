import { Component } from 'react';
import styled from 'styled-components';

const Layout = styled.div``;

interface Props {
  uuid: string;
}

class IngameScene extends Component<Props, any> {
  public render() {
    return (
      <Layout>
        <h1>Ingame</h1>
        <p>{this.props.uuid}</p>
      </Layout>
    );
  }
}

export default IngameScene;
