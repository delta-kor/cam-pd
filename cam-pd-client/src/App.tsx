import { Component, ReactElement } from 'react';
import LoadingScene from './components/scenes/Loading';
import RegisterScene from './components/scenes/Register';
import bookTicket from './services/ticket';
import Transmitter from './services/transmitter';

enum Scene {
  LOADING,
  REGISTER,
}

interface State {
  scene: Scene;
}

const transmitter = new Transmitter();

class App extends Component<any, State> {
  public state = { scene: Scene.LOADING };

  public componentDidMount = async () => {
    const ticket = await bookTicket();
    this.setState({ scene: Scene.REGISTER });
  };

  public render() {
    let scene: ReactElement;
    if (this.state.scene === Scene.LOADING) scene = <LoadingScene />;
    if (this.state.scene === Scene.REGISTER) scene = <RegisterScene />;

    return scene!;
  }
}

export default App;
