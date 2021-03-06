import { Component } from 'react';
import styled from 'styled-components';
import Talker from '../../services/talker';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';
import getCurrentData from '../../timing.util';
import Utils from '../../utils';
import VideoTimeline from '../indicators/VideoTimeline';
import Video from '../medias/Video';

const Layout = styled.div`
  display: flex;
  column-gap: 128px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  justify-content: center;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const ScoreTitle = styled.div`
  font-weight: normal;
  font-size: 36px;
  color: ${Colors.WHITE};
`;

const ScoreContent = styled.div`
  font-weight: bold;
  font-size: 96px;
  color: ${Colors.WHITE};
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const DetailsItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

const DetailsTitle = styled.div`
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
`;

const DetailsContent = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 526px;
`;

interface Props {
  uuid: string;
  inputData: InputData;
}

interface State {
  score: number | null;
  personalBest: number | null;
  worldBest: number | null;
}

class GameResultScene extends Component<Props, State> {
  public state: State = { score: null, personalBest: null, worldBest: null };
  private lastIndex: number = -1;

  public componentDidMount = () => {
    this.getScore();
    Transmitter.emit('videoplay', 'game-result', this.props.uuid);
    Transmitter.on('gamevideotimeupdate', this.onTimeUpdate);
  };

  public componentWillUnmount = () => {
    Transmitter.removeListener('gamevideotimeupdate', this.onTimeUpdate);
  };

  public render() {
    const score = Utils.addComma(this.state.score, '?????? ???...');
    const personalBest = Utils.addComma(this.state.personalBest, '?????? ???...');
    const worldBest = Utils.addComma(this.state.worldBest, '?????? ???...');

    return (
      <Layout>
        <VideoWrapper>
          <Video id={'game-result'} type={'result'} />
          <VideoTimeline controllable={true} />
        </VideoWrapper>
        <Info>
          <ScoreWrapper>
            <ScoreTitle>????????????</ScoreTitle>
            <ScoreContent>{score}</ScoreContent>
          </ScoreWrapper>
          <DetailsWrapper>
            <DetailsItem>
              <DetailsTitle>??????????????????</DetailsTitle>
              <DetailsContent>{personalBest}</DetailsContent>
            </DetailsItem>
            <DetailsItem>
              <DetailsTitle>??????????????????</DetailsTitle>
              <DetailsContent>{worldBest}</DetailsContent>
            </DetailsItem>
          </DetailsWrapper>
        </Info>
      </Layout>
    );
  }

  private getScore = async (): Promise<void> => {
    const payload = { uuid: this.props.uuid, data: this.props.inputData };
    const response = await Talker.post<ApiResponse.Stage.CheckData>('/stage/check', payload);
    if (!response.ok) return alert(response.message);

    this.setState({
      score: response.score,
      personalBest: response.personal_best,
      worldBest: response.world_best,
    });
  };

  private onTimeUpdate = (current: number) => {
    const currentIndex = getCurrentData(this.props.inputData, current * 1000);
    if (currentIndex !== this.lastIndex) {
      Transmitter.emit('selectorselect', currentIndex, current);
      this.lastIndex = currentIndex;
    }
  };
}

export default GameResultScene;
