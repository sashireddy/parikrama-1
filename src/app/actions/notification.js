import {store} from 'react-notifications-component'

export const addNotification = payload => {
    store.addNotification({
        title: payload.title,
        message: payload.message,
        type: payload.type,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        ...payload.config
      });
}