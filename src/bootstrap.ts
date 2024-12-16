/**
 * This can be removed if MSW is not being removed
 * Just remember to remove it from the main.tsx as well
 */
// export const bootstrap = async () => {
//   const { worker } = await import("./api-mocks/browser");

//   await worker.start();
// };

let initialized = false;

export const bootstrap = async () => {
  if (process.env.NODE_ENV === "development" && !initialized) {
    initialized = true;
    const { worker } = await import("./api-mocks/browser");
    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
  return Promise.resolve();
};
