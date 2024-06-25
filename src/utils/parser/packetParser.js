import { getProtoMessages } from "../../init/loadProtos.js"

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();

    const Packet = protoMessages.common.Packet;
    let packet;
    try {
        packet = Packet.decode(data);
    } catch (err) {
        console.error(err);
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.clientVersion;
    const payload = packet.payload;
    const sequence = packet.sequence;

    console.log(`clientVersion: ${clientVersion}`);
    return {handlerId, userId, payload, sequence};
}