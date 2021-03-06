import { Component } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 480px;
  padding: 16px;
  background: ${Colors.GRAY};
  border-radius: 16px;
`;

interface Props {
  stages: Stage[];
  onVideoSelect(uuid: string): void;
}

interface State {
  selected: number;
}

class StageSelector extends Component<Props, State> {
  public state: State = { selected: 0 };

  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.stages !== this.props.stages) {
      this.onSelectorChange(0, this.props.stages[0].uuid);
    }
  };

  public render() {
    return (
      <Layout>
        {this.props.stages.map((stage, index) => (
          <StageSelectorItem
            key={stage.uuid}
            title={stage.title}
            concert={stage.concert}
            active={this.state.selected === index}
            onClick={() => this.onSelectorChange(index, stage.uuid)}
          />
        ))}
      </Layout>
    );
  }

  private onSelectorChange = (index: number, uuid: string) => {
    this.setState({ selected: index });
    this.props.onVideoSelect(uuid);
  };
}

const ItemLayout = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${({ active }) => (active ? Colors.LIGHT_GRAY : Colors.GRAY)};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  user-select: none;
  transition: 0.2s background;
`;

const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.WHITE};
`;

const ItemConcert = styled.div`
  font-weight: normal;
  font-size: 18px;
  color: ${Colors.WHITE};
`;

interface ItemProps {
  title: string;
  concert: string;
  active: boolean;
  onClick(): void;
}

class StageSelectorItem extends Component<ItemProps, any> {
  public render() {
    return (
      <ItemLayout active={this.props.active} onClick={this.props.onClick}>
        <ItemTitle>{this.props.title}</ItemTitle>
        <ItemConcert>{this.props.concert}</ItemConcert>
      </ItemLayout>
    );
  }
}

export default StageSelector;
