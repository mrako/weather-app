import { io, Socket } from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const STORED_USER = import.meta.env.VITE_STORED_USER;

export const FETCH_TIMEOUT = 10 * 1000;

let socketInstance: Socket | null = null;
let connectionPromise: Promise<Socket | null> | null = null;

export const getUser = () => JSON.parse(localStorage.getItem(STORED_USER) || 'null');

export const getSocket = async (): Promise<Socket | null> => {
  if (socketInstance) {
    return socketInstance;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise((resolve, reject) => {
    const user = getUser();

    if (!user?.token) {
      connectionPromise = null;
      reject(new Error('No user token available for socket connection'));
      return;
    }

    socketInstance = io(ENDPOINT, {
      query: { token: user.token },
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      resolve(socketInstance);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        socketInstance?.connect();
      }
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      connectionPromise = null; // Reset the promise to allow retrying
      reject(error);
    });

    socketInstance.connect();
  });

  return connectionPromise;
};

export const closeSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    connectionPromise = null;
  }
};
