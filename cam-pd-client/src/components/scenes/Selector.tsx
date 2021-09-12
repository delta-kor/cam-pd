import { Component } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';
import StageSelector from '../actions/StageSelector';

const Layout = styled.div`
  display: flex;
  column-gap: 112px;
`;

const StageSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const StageSelectorTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.WHITE};
`;

class SelectorScene extends Component<any, any> {
  public render() {
    return (
      <Layout>
        <StageSelectorWrapper>
          <StageSelectorTitle>곡 선택</StageSelectorTitle>
          <StageSelector
            stages={[
              { title: 'test1', concert: 'test1', uuid: 'test1' },
              { title: 'test2', concert: 'test2', uuid: 'test2' },
            ]}
          />
        </StageSelectorWrapper>
      </Layout>
    );
  }
}

export default SelectorScene;
