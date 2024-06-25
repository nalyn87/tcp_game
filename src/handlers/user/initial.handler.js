import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { addUser } from "../../sessions/user.session.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createReponse.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;
  
    addUser(socket, deviceId);
  
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      {userId : deviceId},
      deviceId,
    )
  
    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
