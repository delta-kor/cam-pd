import { Component } from 'react';
import styled from 'styled-components';

const Layout = styled.div``;

interface Props {
  inputData: InputData;
}

class GameResultScene extends Component<Props, any> {
  public componentDidMount() {
    console.log(JSON.stringify(this.props.inputData));
  }

  public render() {
    return (
      <Layout>
        <h1>Game Result Scene</h1>
      </Layout>
    );
  }
}

export default GameResultScene;
