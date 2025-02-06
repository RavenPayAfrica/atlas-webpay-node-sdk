interface WidgetOptions {
  [key: string]: any;
}

export interface Config {
  appName: string;
  environment?: 'sandbox' | 'production';
  widgetOptions?: WidgetOptions;
  containerId?: string;
  onSuccess?: (data: any) => void;
  onFail?: (data: any) => void;
  onError?: (error: any) => void;
  onLoad?: () => void;
}

interface Message {
  type: string;
  data: any;
  message?: any;
}

interface MountOptions {
  email?: string;
  amount?: number;
  containerId?: string;
}
class BankboxManager {
  private appName: string;
  private environment?: 'sandbox' | 'production';
  private widgetOptions?: WidgetOptions;
  private containerId: string;
  private iframe: HTMLIFrameElement | null;
  private container: HTMLDivElement | null;
  private messageHandlers: Map<string, Set<(data: any) => void>>;
  private targetOrigin: string;
  private isInitialized: boolean;

  constructor(config: Config) {
    this.appName = config.appName;
    this.environment = config.environment;
    this.widgetOptions = config.widgetOptions;
    this.containerId = config.containerId ?? 'bankbox-container';
    this.iframe = null;
    this.container = null;
    this.messageHandlers = new Map();
    this.targetOrigin = this.getTargetOrigin();
    this.isInitialized = false;

    // Register event listeners
    this.registerCoreListeners(config);
  }

  private getTargetOrigin(params?:MountOptions): string {

    const defaultAppName = 'bankly';

    if (params && params.email){
    return `https://${this.appName ?? defaultAppName}.bankbox.me?email=${params.email}`;
    }

    if(params && params.amount){
    return `https://${this.appName ?? defaultAppName}.bankbox.me?amount=${params.amount}`;
    } 

    return `https://${this.appName ?? defaultAppName}.bankbox.me`;
  }

  private registerCoreListeners(config: Config): void {
    if (config.onSuccess) this.addEventListener('success', config.onSuccess);
    if (config.onFail) this.addEventListener('fail', config.onFail);
    if (config.onError) this.addEventListener('error', config.onError);
    if (config.onLoad) this.addEventListener('load', config.onLoad);
  }

  private initializeIframe(options?:MountOptions): void {
    if (!this.container) {
      this.container = document.getElementById(this.containerId) as HTMLDivElement;
      
      if (!this.container) {
        // The overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
        overlay.style.backdropFilter = 'blur(10px)'; // Blur effect
        overlay.style.zIndex = '9998'; // Ensure it is behind the container
        document.body.appendChild(overlay);
      
        //  The container
        this.container = document.createElement('div');
        this.container.id = this.containerId;
        this.container.style.position = 'fixed';
        this.container.style.bottom = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '98%'; 
        this.container.style.zIndex = '9999'; 
        this.container.style.display = 'none';
        this.container.style.overflow = 'hidden';
        this.container.style.backgroundColor = 'white'; 
        this.container.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)'; 
        this.container.style.borderTopLeftRadius = '30px'; 
        this.container.style.borderTopRightRadius = '30px'; 
        document.body.appendChild(this.container);
      
        // the close button
        const closeButton = document.createElement('span');
        closeButton.innerText = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.width = '30px';
        closeButton.style.height = '30px';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.display = 'grid';
        closeButton.style.placeItems = 'center';
        closeButton.style.backgroundColor = 'black'; 
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10000'; 
      
        // close button event listener
        closeButton.addEventListener('click', () => {
          this.container!.style.display = 'none';
          overlay.style.display = 'none';
        });
      
        this.container.appendChild(closeButton);
      }
    }
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
      this.iframe.style.display = 'none';
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      this.iframe.src = this.getTargetOrigin(options);
      
      this.iframe.onload = () => {
        this.isInitialized = true;
        this.dispatchEvent('load', null);
        window.addEventListener('message', this.handleIncomingMessage.bind(this));
      };
    
      this.iframe.onerror = (error) => {
        this.dispatchEvent('error', {
          type: 'iframe_error',
          message: 'Failed to load Bankbox iframe',
          error
        });
      };

      this.container.appendChild(this.iframe);
    }
  }

  public mount(options?: MountOptions): void {
    if (options?.containerId) {
      const containerElement = document.getElementById(options?.containerId);
      if (!containerElement) {
        throw new Error(`Container element with id '${options?.containerId}' not found`);
      }
      this.container = containerElement as HTMLDivElement;
    } else {
      this.initializeIframe(options);
    }

    if (!this.container) {
      throw new Error('Container element not found');
    }

    this.container.style.display = 'block';

    if (this.iframe && !this.iframe.parentElement) {
      this.container.appendChild(this.iframe);
    }

    this.iframe!.style.display = 'block';
  }

  public open(options?: MountOptions): void {
    this.mount(options);
    this.sendMessage({
      type: 'sdk:open',
      data: undefined
    });
  }

  public close(): void {
    if (this.container) {
      this.container.style.display = 'none';
    }
    if (this.iframe) {
      this.iframe.style.display = 'none';
      this.sendMessage({
        type: 'sdk:close',
        data: undefined
      });
    }
  }

  private handleIncomingMessage(event: MessageEvent): void {
    if (event.origin !== this.targetOrigin) return;
    
    const message: Message = event.data;
    if (!message?.type) return;

    switch (message.type) {
      case 'bankbox:ready':
        this.handleBankboxReady();
        break;
      case 'rrn_data':
        this.dispatchEvent(message.message?.status, message.data);
        break;
      case 'bankbox:close':
        this.close();
        break;
      default:
        this.dispatchEvent(message.type, message.data);
    }
  }

  private handleBankboxReady(): void {
    this.sendMessage({
      type: 'sdk:init',
      data: {
        environment: this.environment,
        ...this.widgetOptions
      }
    });
  }

  public addEventListener(type: string, callback: (data: any) => void): void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)?.add(callback);
  }

  public removeEventListener(type: string, callback: (data: any) => void): void {
    this.messageHandlers.get(type)?.delete(callback);
  }

  private dispatchEvent(type: string, data: any): void {
    this.messageHandlers.get(type)?.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in ${type} handler:`, error);
      }
    });
  }

  public sendMessage(message: Message): void {
    if (!this.isInitialized) {
      console.warn('Message not sent - Bankbox not initialized');
      return;
    }
    
    this.iframe?.contentWindow?.postMessage(message, this.targetOrigin);
  }

  public destroy(): void {
    window.removeEventListener('message', this.handleIncomingMessage);
    if (this.iframe?.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
    this.iframe = null;
    this.isInitialized = false;
  }
}

export default BankboxManager;
