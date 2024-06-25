import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);
      console.log(`length: ${length}, packetType: ${packetType}`);
      console.log(`packet: ${packet}`);

      switch (packetType) {
        case PACKET_TYPE.PING:
          break;
        case PACKET_TYPE.NORMAL:
          const { handlerId, userId, payload, sequence } = packetParser(packet);

          console.log(`handlerId: ${handlerId}`);
          console.log(`userId: ${userId}`);
          console.log(`payload: ${payload}`);
          console.log(`sequence: ${sequence}`);
      }
    } else {
      // 아직 전체 패킷이 도착하지 않음
      break;
    }
  }
};
