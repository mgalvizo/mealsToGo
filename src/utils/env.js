const liveHost = 'https://us-central1-mealstogo-15801.cloudfunctions.net';
// Tunnel with ngrok (http://127.0.0.1:5001)
const localhost =
    'https://5e8f-2806-108e-24-83f6-9978-635b-d7d8-b13.ngrok-free.app/mealstogo-15801/us-central1';

const isDevelopment = process.env.NODE_ENV === 'development';

const host = isDevelopment ? localhost : liveHost;

export { isDevelopment, host };
