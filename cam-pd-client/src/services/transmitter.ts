import EventEmitter from 'events';

interface TransmitterEvents {
  registercomplete(): void;
}

declare interface TransmitterClass {
  on<U extends keyof TransmitterEvents>(event: U, listener: TransmitterEvents[U]): this;
  emit<U extends keyof TransmitterEvents>(
    event: U,
    ...args: Parameters<TransmitterEvents[U]>
  ): boolean;
}

class TransmitterClass extends EventEmitter {}

const Transmitter = new TransmitterClass();

export default Transmitter;
