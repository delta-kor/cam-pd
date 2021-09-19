import { Component } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  top: 0;
  left: 0;
  width: 100%;
`;

interface Props {
  uuid: string;
}

interface State {}

class CameraSelector extends Component<Props, State> {
  public render() {
    const ticket = Talker.ticket!;
    const token = Talker.token!;
    const uuid = this.props.uuid;

    // prettier-ignore
    const url = `${Config.base_url}/stage/video?ticket=${encodeURI(ticket)}&token=${encodeURI(token)}&uuid=${uuid}`;

    return (
      <Layout>
        <Video src={url} />
      </Layout>
    );
  }
}

export default CameraSelector;
