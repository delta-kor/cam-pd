import { Component } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';
import CameraSelector from '../actions/CameraSelector';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CameraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 56px;
  padding: 56px 0 0 0;
  width: 50%;
  height: 100%;
`;

const ProgramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 56px;
  padding: 56px 0 0 0;
  width: 50%;
  height: 100%;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${Colors.WHITE};
  user-select: none;
`;

const CameraSelectorWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  uuid: string;
}

class IngameScene extends Component<Props, any> {
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
        </ProgramWrapper>
      </Layout>
    );
  }
}

export default IngameScene;
