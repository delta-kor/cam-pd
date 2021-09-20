import React, { Component, RefObject } from 'react';
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

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
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

  public videoRef: RefObject<HTMLVideoElement> = React.createRef();

  public componentDidMount = () => {
    Transmitter.on('videoplay', this.onVideoPlay);
    this.videoRef.current?.addEventListener('contextmenu', this.onVideoContextMenu);
  };

  public componentWillUnmount = () => {
    Transmitter.removeListener('videoplay', this.onVideoPlay);
    this.videoRef.current?.removeEventListener('contextmenu', this.onVideoContextMenu);
  };

  public render() {
    if (!this.state.ticket || !this.state.token || !this.state.uuid) {
      return <Layout />;
    }

    // prettier-ignore
    const url = `${Config.base_url}/stage/video?ticket=${encodeURI(this.state.ticket)}&token=${encodeURI(this.state.token)}&uuid=${this.state.uuid}`;

    return (
      <Layout onClick={this.onVideoClick}>
        <ContentWrapper>
          <Content src={url} ref={this.videoRef} />
        </ContentWrapper>
      </Layout>
    );
  }

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
    if (this.videoRef.current?.paused) this.play();
    else this.pause();
  };

  private play = () => {
    this.videoRef.current?.play();
  };

  private pause = () => {
    this.videoRef.current?.pause();
  };
}

export default Video;
