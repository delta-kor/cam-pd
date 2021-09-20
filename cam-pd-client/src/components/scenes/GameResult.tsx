import { Component } from 'react';
import styled from 'styled-components';
import Talker from '../../services/talker';

const Layout = styled.div``;

interface Props {
  uuid: string;
  inputData: InputData;
}

interface State {
  score: number | null;
}

class GameResultScene extends Component<Props, State> {
  public state: State = { score: null };

  public componentDidMount() {
    this.getScore();
  }

  public render() {
    return (
      <Layout>
        <h1>Game Result Scene</h1>
        <p>{this.state.score || '채점 중'}</p>
      </Layout>
    );
  }

  private async getScore(): Promise<void> {
    const payload = { uuid: this.props.uuid, data: this.props.inputData };
    const response = await Talker.post<ApiResponse.Stage.CheckData>('/stage/check', payload);
    if (!response.ok) return alert(response.message);

    this.setState({ score: response.score });
  }
}

export default GameResultScene;
