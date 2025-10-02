interface Window {
  webkit?: {
    messageHandlers?: {
      sendPushToken: {
        postMessage: (token: string) => void;
      };
    };
  };
}
