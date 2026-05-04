const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname === "127.0.0.1"
  );
  
  export function register() {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL!, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          checkValidServiceWorker(swUrl);
        } else {
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl: string) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Error registering service worker:", error);
      });
  }
  
  function checkValidServiceWorker(swUrl: string) {
    fetch(swUrl)
      .then((response) => {
        if (
          response.status === 404 ||
          response.headers.get("content-type")!.indexOf("javascript") === -1
        ) {
          // No service worker found. Probably a different app. Reload the page.
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found. Proceed with registration.
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      });
  }
  