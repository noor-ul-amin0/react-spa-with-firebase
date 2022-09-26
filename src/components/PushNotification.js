import { toast } from "react-toastify";
import {
  onMessageListener,
  requestForToken,
} from "../config/firebaseFunctions";

const PushNotification = () => {
  requestForToken();
  onMessageListener()
    .then((payload) => {
      console.log(payload);
      toast.info(JSON.stringify(payload.notification.body));
    })
    .catch((err) => toast.error(err));
  return null;
};

export default PushNotification;
