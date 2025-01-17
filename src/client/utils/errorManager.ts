type ErrorHandler = (message: string) => void;

class ErrorManager {
  private handler: ErrorHandler | null = null;

  setHandler(handler: ErrorHandler) {
    this.handler = handler;
  }

  notify(message: string) {
    if (this.handler) {
      this.handler(message);
    } else {
      console.error("Unknown error:", message);
    }
  }
}

export const errorManager = new ErrorManager();
