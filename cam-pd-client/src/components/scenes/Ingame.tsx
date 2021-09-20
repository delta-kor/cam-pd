import { Component } from 'react';
import styled from 'styled-components';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';
import CameraSelector from '../actions/CameraSelector';
import VideoTimeline from '../indicators/VideoTimeline';
import Video from '../medias/Video';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CameraWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 56px;
  padding: 134px 0 0 0;
  width: 50%;
  height: 100%;
`;

const ProgramWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 56px;
  width: 50%;
  height: 100%;
`;

const SectionTitle = styled.div`
  position: absolute;
  top: 56px;
  font-weight: bold;
  font-size: 18px;
  color: ${Colors.WHITE};
  user-select: none;
`;

const CameraSelectorWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 526px;
  height: 100%;
  row-gap: 16px;
`;

interface Props {
  uuid: string;
}

class IngameScene extends Component<Props, any> {
  public componentDidMount = () => {
    Transmitter.emit('videoplay', 'game-program', this.props.uuid);
    Transmitter.on('videoload', this.onProgramVideoLoad);
  };

  public componentWillUnmount = () => {
    Transmitter.removeListener('videoload', this.onProgramVideoLoad);
  };

  public render() {
    return (
      <Layout>
        <CameraWrapper>
          <SectionTitle>CAMERA</SectionTitle>
          <CameraSelectorWrapper>
            <CameraSelector uuid={this.props.uuid} />
          </CameraSelectorWrapper>
        </CameraWrapper>
        <ProgramWrapper>
          <SectionTitle>PROGRAM</SectionTitle>
          <VideoWrapper>
            <Video id={'game-program'} type={'ingame'} />
            <VideoTimeline />
          </VideoWrapper>
        </ProgramWrapper>
      </Layout>
    );
  }

  private onProgramVideoLoad = (id: string) => {
    if (id !== 'game-program') return false;
    Transmitter.emit('gamevideostart');
  };
}

export default IngameScene;
