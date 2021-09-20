import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const TimeLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeLabel = styled.div`
  font-weight: normal;
  font-size: 18px;
  color: ${Colors.WHITE};
  user-select: none;
`;

const IndicatorWrapper = styled.div<{ controllable: boolean }>`
  height: 8px;
  background: ${Colors.LIGHT_GRAY};
  border-radius: 100px;
  cursor: ${({ controllable }) => (controllable ? 'pointer' : 'unset')};
`;

const Indicator = styled(motion.div)`
  width: 0;
  height: 100%;
  background: ${Colors.WHITE};
  border-radius: 100px;
`;

interface Props {
  controllable?: boolean;
}

interface State {
  current: number;
  total: number;
}

class VideoTimeline extends Component<Props, State> {
  public state: State = { current: 0, total: 0 };

  public componentDidMount = () => {
    Transmitter.on('gamevideotimeupdate', this.onTimeUpdate);
  };

  public componentWillUnmount = () => {
    Transmitter.removeListener('gamevideotimeupdate', this.onTimeUpdate);
  };

  public render() {
    const currentTime = secondsToString(this.state.current);
    const totalTime = secondsToString(this.state.total);
    const percentage = this.state.current / this.state.total || 0;

    return (
      <Layout>
        <TimeLabelWrapper>
          <TimeLabel>{currentTime}</TimeLabel>
          <TimeLabel>{totalTime}</TimeLabel>
        </TimeLabelWrapper>
        <IndicatorWrapper controllable={!!this.props.controllable}>
          <Indicator animate={{ width: `${percentage * 100}%` }} transition={{ duration: 0 }} />
        </IndicatorWrapper>
      </Layout>
    );
  }

  private onTimeUpdate = (current: number, total: number) => {
    this.setState({ current, total });
  };
}

function secondsToString(sec: number): string {
  if (!sec) return '00:00.000';

  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec - minutes * 60);
  const mseconds = (sec - seconds - minutes * 60).toString().slice(2, 5);

  // prettier-ignore
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${mseconds}`;
}

export default VideoTimeline;
