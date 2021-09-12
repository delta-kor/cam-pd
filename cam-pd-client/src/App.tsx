import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import LoadingScene from './components/scenes/Loading';
import RegisterScene from './components/scenes/Register';
import SelectorScene from './components/scenes/Selector';
import Config from './config';
import Talker from './services/talker';
import bookTicket from './services/ticket';
import Transmitter from './services/transmitter';

enum Scene {
  LOADING,
  REGISTER,
  SELECTOR,
}

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface State {
  scene: Scene;
}

class App extends Component<any, State> {
  public state = { scene: Scene.LOADING };

  public componentDidMount = () => {
    this.preprocess();

    Transmitter.on('registercomplete', () => this.preprocess());
  };

  public render() {
    let scene: ReactElement;
    if (this.state.scene === Scene.LOADING) scene = <LoadingScene />;
    if (this.state.scene === Scene.REGISTER) scene = <RegisterScene />;
    if (this.state.scene === Scene.SELECTOR) scene = <SelectorScene />;

    return <Layout>{scene!}</Layout>;
  }

  private preprocess = async () => {
    const ticket = await bookTicket();
    const token = localStorage.getItem(Config.token_key);

    Talker.setTicket(ticket);
    Talker.setToken(token);

    const userResponse = await Talker.get<ApiResponse.User.Get>('/user');

    if (!userResponse.ok) {
      this.setState({ scene: Scene.REGISTER });
      return true;
    }

    this.setState({ scene: Scene.SELECTOR });
  };
}

export default App;
