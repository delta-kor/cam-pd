import EventEmitter from 'events';

interface TransmitterEvents {}

declare interface Transmitter {
  on<U extends keyof TransmitterEvents>(event: U, listener: TransmitterEvents[U]): this;
  emit<U extends keyof TransmitterEvents>(
    event: U,
    ...args: Parameters<TransmitterEvents[U]>
  ): boolean;
}

class Transmitter extends EventEmitter {}

export default Transmitter;
