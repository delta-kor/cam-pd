import React, { Component, RefObject } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';

const MaxLayoutWidth = '900px';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: ${MaxLayoutWidth};
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const SelectorWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: start;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SelectorItem = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: calc(min(50vw, ${MaxLayoutWidth}) / 2 * (9 / 16));
  background: ${({ active }) => (active ? 'transparent' : Colors.BLACK)};
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.WHITE};
  user-select: none;
`;

const SelectorTag = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  min-width: 18%;
  min-height: 10%;
  padding: 4px 16px;
  font-weight: normal;
  font-size: 12px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
`;

const SelectorHighlight = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid ${Colors.WHITE};
  z-index: 1;
`;

interface Props {
  uuid: string;
}

interface State {
  selectorCount: number;
  active: number;
}

class CameraSelector extends Component<Props, State> {
  public state: State = { selectorCount: 6, active: 4 };
  private layoutRef: RefObject<HTMLDivElement> = React.createRef();
  private videoRef: RefObject<HTMLVideoElement> = React.createRef();
  private interval: any;

  public componentDidMount = () => {
    this.interval = setInterval(() => {
      Transmitter.emit(
        'gamevideotimeupdate',
        this.videoRef.current!.currentTime,
        this.videoRef.current!.duration
      );
    }, 50);

    this.updateSelectorCount();
    window.addEventListener('resize', this.updateSelectorCount);
    this.videoRef.current?.addEventListener('pause', this.onVideoPause);
    Transmitter.on('gamevideostart', this.startGame);
  };

  public componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateSelectorCount);
    Transmitter.removeListener('gamevideostart', this.startGame);
    clearInterval(this.interval);
  };

  public render() {
    const ticket = Talker.ticket!;
    const token = Talker.token!;
    const uuid = this.props.uuid;

    // prettier-ignore
    const url = `${Config.base_url}/stage/video?ticket=${encodeURI(ticket)}&token=${encodeURI(token)}&uuid=${uuid}`;

    const selectorItems = [];

    for (let i = 0; i < this.state.selectorCount; i++) {
      const isActive = i > 0 && i < 6;
      const isHighlighted = this.state.active === i - 1;
      selectorItems.push(
        <SelectorItem active={isActive} onClick={() => this.onSelectorClick(i)} key={i}>
          <SelectorTag>CAM{i + 1}</SelectorTag>
          {isHighlighted && <SelectorHighlight />}
          {!isActive && 'NO SIGNAL'}
        </SelectorItem>
      );
    }

    return (
      <Layout ref={this.layoutRef}>
        <Video src={url} ref={this.videoRef} />
        <SelectorWrapper>{selectorItems}</SelectorWrapper>
      </Layout>
    );
  }

  private updateSelectorCount = () => {
    if (!this.layoutRef.current) return false;

    const { clientWidth: width, clientHeight: height } = this.layoutRef.current;

    const selectorHeight = (width / 2) * (9 / 16);
    const rowCount = Math.floor(height / selectorHeight);
    const iteration = rowCount * 2;

    this.setState({ selectorCount: iteration });
  };

  private onSelectorClick = (elementIndex: number) => {
    if (elementIndex < 1 || elementIndex > 5) return false;
    const index = elementIndex - 1;
    if (index === this.state.active) return false;
    this.setState({ active: index });
    Transmitter.emit('selectorselect', index, this.videoRef.current!.currentTime);
  };

  private startGame = () => {
    this.playVideo();
    Transmitter.emit('selectorselect', 4, this.videoRef.current!.currentTime);
  };

  private onVideoPause = () => {
    this.playVideo();
    this.onSelectorClick(this.state.active + 1);
  };

  private playVideo = () => {
    this.videoRef.current?.play();
  };
}

export default CameraSelector;
