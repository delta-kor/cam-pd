import { Component } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import { Colors } from '../../styles';
import StageSelector from '../actions/StageSelector';

const Layout = styled.div`
  display: flex;
  column-gap: 112px;
`;

const StageSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const StageSelectorTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.WHITE};
`;

interface State {
  stages: Stage[];
}

class SelectorScene extends Component<any, State> {
  public state = { stages: [] };

  public componentDidMount = () => {
    this.loadStages();
  };

  public render() {
    return (
      <Layout>
        <StageSelectorWrapper>
          <StageSelectorTitle>곡 선택</StageSelectorTitle>
          <StageSelector stages={this.state.stages} />
        </StageSelectorWrapper>
      </Layout>
    );
  }

  private loadStages = async () => {
    const response = await Talker.get<ApiResponse.Stage.Get>('/stage');
    if (!response.ok) return alert(response.message || Config.default_error_message);

    this.setState({ stages: response.stages });
  };
}

export default SelectorScene;
