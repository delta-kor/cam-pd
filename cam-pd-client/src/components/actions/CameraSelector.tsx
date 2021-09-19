import { Component } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import { Colors } from '../../styles';

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const SelectorItem = styled.div`
  position: relative;
  height: calc(50vw / 2 * (9 / 16));
`;

const SelectorTitle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 16px;
  font-weight: normal;
  font-size: 12px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  user-select: none;
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

    const selectorItems = [];

    for (let i = 0; i < 6; i++) {
      selectorItems.push(
        <SelectorItem key={i}>
          <SelectorTitle>CAM{i + 1}</SelectorTitle>
        </SelectorItem>
      );
    }

    return (
      <Layout>
        <Video src={url} />
        <SelectorWrapper>{selectorItems}</SelectorWrapper>
      </Layout>
    );
  }
}

export default CameraSelector;
