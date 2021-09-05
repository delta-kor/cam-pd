import { Component } from 'react';
import styled from 'styled-components';
import SpinnerIcon from '../../icons/loading-spinner.svg';
import { Colors } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 48px;
`;

const Spinner = styled.img`
  width: 96px;
  height: 96px;
  animation: rotate 3s ease-in-out infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 48px;
  color: ${Colors.WHITE};
  user-select: none;
`;

class LoadingScene extends Component<any, any> {
  public render() {
    return (
      <Layout>
        <Spinner src={SpinnerIcon} />
        <Text>Loading...</Text>
      </Layout>
    );
  }
}

export default LoadingScene;
