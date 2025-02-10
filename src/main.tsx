// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./entities/store";
import "./index.css";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("../mocks");
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
  //
}

// Start mocking if in development mode
enableMocking().finally(() => {
  // Render the application regardless of whether mocking is enabled or not
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
