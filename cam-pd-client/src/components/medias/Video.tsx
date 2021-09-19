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

interface Props {
  id: string;
}

interface State {
  uuid: string;
  ticket: string;
  token: string;
}

class Video extends Component<Props, State> {
  public state = { uuid: '', ticket: '', token: '' };

  public videoRef: RefObject<HTMLVideoElement>;

  constructor(props: any) {
    super(props);
    this.videoRef = React.createRef<HTMLVideoElement>();
  }

  public componentDidMount = () => {
    Transmitter.on('playvideo', (id, uuid) => {
      if (id !== this.props.id) return false;

      const ticket = Talker.ticket!;
      const token = Talker.token! + 'lol';

      this.setState({ uuid, ticket, token }, () => {
        this.play();
      });
    });

    this.videoRef.current?.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  };

  public render() {
    if (!this.state.ticket || !this.state.token || !this.state.uuid) {
      return <Layout />;
    }

    // prettier-ignore
    const url = `${Config.base_url}/stage/video?ticket=${encodeURI(this.state.ticket)}&token=${encodeURI(this.state.token)}&uuid=${this.state.uuid}`;

    return (
      <Layout onClick={this.play}>
        <ContentWrapper>
          <Content src={url} ref={this.videoRef} />
        </ContentWrapper>
      </Layout>
    );
  }

  private play = () => {
    this.videoRef.current?.play();
  };
}

export default Video;
