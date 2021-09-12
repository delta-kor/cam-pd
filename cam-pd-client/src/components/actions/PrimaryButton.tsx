import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';

const Layout = styled(motion.div)`
  padding: 8px 36px;
  background: ${Colors.BLUE};
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  color: ${Colors.WHITE};
  cursor: pointer;
  user-select: none;
`;

interface Props {
  content: string;
  onClick: () => void;
}

class PrimaryButton extends Component<Props, any> {
  public render() {
    return (
      <Layout whileHover={{ scale: 1.05 }} onClick={this.props.onClick}>
        {this.props.content}
      </Layout>
    );
  }
}

export default PrimaryButton;
