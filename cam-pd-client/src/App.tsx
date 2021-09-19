import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import IngameScene from './components/scenes/Ingame';
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
  INGAME,
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
  stageUuid: string | null;
}

class App extends Component<any, State> {
  public state: State = { scene: Scene.LOADING, stageUuid: null };

  public componentDidMount = () => {
    this.preprocess();

    Transmitter.on('registercomplete', this.preprocess);
    Transmitter.on('gamestart', this.startGame);
  };

  public render() {
    let scene: ReactElement;
    if (this.state.scene === Scene.LOADING) scene = <LoadingScene />;
    if (this.state.scene === Scene.REGISTER) scene = <RegisterScene />;
    if (this.state.scene === Scene.SELECTOR) scene = <SelectorScene />;
    if (this.state.scene === Scene.INGAME) scene = <IngameScene uuid={this.state.stageUuid!} />;

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

  private startGame = (uuid: string) => {
    this.setState({ scene: Scene.INGAME, stageUuid: uuid });
  };
}

export default App;
