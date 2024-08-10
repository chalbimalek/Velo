import { Component } from '@angular/core';
interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}
@Component({
  selector: 'app-chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.css']
})
export class ChattComponent {

  constructor() {
    const customWindow: CustomWindow = window;

    customWindow.embeddedChatbotConfig = {
      chatbotId: 'c4_fFbFsL-cYs9-NvhrVk',
      domain: 'www.chatbase.co',
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'c4_fFbFsL-cYs9-NvhrVk');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    script.onload = () => {
      console.log('Chatbase script loaded successfully!');
      // Perform additional actions if needed
    };

    script.onerror = (error) => {
      console.error('Error loading Chatbase script:', error);
    };

    document.head.appendChild(script);
  }
}