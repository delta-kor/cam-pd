import React, { Component } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import Transmitter from '../../services/transmitter';

const Layout = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
`;

const ContentWrapper = styled.div<{ ingame: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${({ ingame }) => (ingame ? '0' : '8px')};
  overflow: hidden;
`;

const Content = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
`;

type VideoType = 'preview' | 'ingame';

interface Props {
  id: string;
  type: VideoType;
}

interface State {
  uuid: string;
  ticket: string;
  token: string;
}

class Video extends Component<Props, State> {
  public state: State = { uuid: '', ticket: '', token: '' };

  public video: HTMLVideoElement | null = null;

  public componentDidMount = () => {
    Transmitter.on('videoplay', this.onVideoPlay);
    Transmitter.on('selectorselect', this.onSelectorSelect);
  };

  public componentWillUnmount = () => {
    Transmitter.removeListener('videoplay', this.onVideoPlay);
    Transmitter.removeListener('selectorselect', this.onSelectorSelect);
    this.video?.removeEventListener('contextmenu', this.onVideoContextMenu);
  };

  public render() {
    if (!this.state.ticket || !this.state.token || !this.state.uuid) {
      return <Layout />;
    }

    // prettier-ignore
    const url = `${Config.base_url}/stage/video?ticket=${encodeURI(this.state.ticket)}&token=${encodeURI(this.state.token)}&uuid=${this.state.uuid}`;
    const ingame = this.props.type === 'ingame';

    return (
      <Layout onClick={this.onVideoClick}>
        <ContentWrapper ingame={ingame}>
          <Content src={url} ref={this.onVideoMounted} muted={ingame} />
        </ContentWrapper>
      </Layout>
    );
  }

  private onVideoMounted = (element: HTMLVideoElement) => {
    if (!element) return false;
    this.video = element;
    this.video.addEventListener('contextmenu', this.onVideoContextMenu);
    Transmitter.emit('videoload', this.props.id);
  };

  private onVideoPlay = (id: string, uuid: string) => {
    if (id !== this.props.id) return false;

    const ticket = Talker.ticket!;
    const token = Talker.token!;

    this.setState({ uuid, ticket, token }, () => {
      this.play();
    });
  };

  private onVideoContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  private onVideoClick = () => {
    if (this.props.type === 'ingame') return false;
    if (this.video?.paused) this.play();
    else this.pause();
  };

  private play = () => {
    this.video?.play();
  };

  private pause = () => {
    this.video?.pause();
  };

  private onSelectorSelect = (index: number, currentTime: number) => {
    const video = this.video;
    if (!video) return false;

    let top: string = '0';
    let left: string = '0';

    if ([0, 2, 4].includes(index)) left = '-100%';
    if ([1, 2].includes(index)) top = '-100%';
    if ([3, 4].includes(index)) top = '-200%';

    video.style.top = top;
    video.style.left = left;
    video.currentTime = currentTime;
  };
}

export default Video;
