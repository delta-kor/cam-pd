import { Component } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';
import PrimaryButton from '../actions/PrimaryButton';
import StageSelector from '../actions/StageSelector';
import Video from '../medias/Video';

const Layout = styled.div`
  display: flex;
  align-items: center;
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

const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  align-items: center;
`;

const StageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px;
  width: 480px;
  background: ${Colors.GRAY};
  border-radius: 16px;
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
          <StageSelector stages={this.state.stages} onVideoSelect={this.onSelectorChange} />
        </StageSelectorWrapper>
        <SideMenuWrapper>
          <StageInfoWrapper>
            <Video id={'stage-select'} />
          </StageInfoWrapper>
          <PrimaryButton content={'시작하기'} onClick={this.onStart} />
        </SideMenuWrapper>
      </Layout>
    );
  }

  private loadStages = async () => {
    const response = await Talker.get<ApiResponse.Stage.Get>('/stage');
    if (!response.ok) return alert(response.message || Config.default_error_message);

    this.setState({ stages: response.stages });
  };

  private onSelectorChange = (uuid: string) => {
    Transmitter.emit('playvideo', 'stage-select', uuid);
  };

  private onStart = () => {
    console.log('Start!');
  };
}

export default SelectorScene;
