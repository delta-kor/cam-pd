import { ChangeEvent, Component, KeyboardEvent } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import Talker from '../../services/talker';
import Transmitter from '../../services/transmitter';
import { Colors } from '../../styles';
import PrimaryButton from '../actions/PrimaryButton';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  row-gap: 16px;
  background: ${Colors.GRAY};
  border-radius: 16px;
`;

const Title = styled.div`
  align-self: stretch;
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.WHITE};
`;

const Input = styled.input`
  display: block;
  width: 352px;
  height: 42px;
  padding: 8px 12px;
  border: none;
  background: ${Colors.LIGHT_GRAY};
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: ${Colors.WHITE};
  transition: 0.2s;

  :hover {
    background: ${Colors.EXTRA_LIGHT_GRAY};
  }

  ::placeholder {
    font-weight: normal;
    color: ${Colors.WHITE}80;
  }
`;

const ErrorMessage = styled.div`
  align-self: stretch;
  font-weight: bold;
  font-size: 12px;
  color: #ff3d3d;
  white-space: pre-wrap;
`;

interface State {
  nickname: string;
  errorMessage: string | null;
}

class RegisterScene extends Component<any, State> {
  public state: State = { nickname: '', errorMessage: null };

  public render() {
    return (
      <Layout>
        <Title>닉네임을 입력해주세요</Title>
        <Input
          placeholder={'한글, 영어, 숫자 최대 12자'}
          maxLength={12}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {this.state.errorMessage && <ErrorMessage>{this.state.errorMessage}</ErrorMessage>}
        <PrimaryButton content={'확인'} onClick={this.onSubmit} />
      </Layout>
    );
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ nickname: e.target.value });
  };

  private onSubmit = async () => {
    const data = await Talker.post<ApiResponse.User.Create>('/user', {
      nickname: this.state.nickname,
    });

    if (!data.ok) {
      this.setState({
        errorMessage: data.message || Config.default_error_message,
      });
      return false;
    }

    const token = data.token as string;
    localStorage.setItem(Config.token_key, token);
    Transmitter.emit('registercomplete');
  };
}

export default RegisterScene;
