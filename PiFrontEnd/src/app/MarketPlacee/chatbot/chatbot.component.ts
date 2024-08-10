import { Component, OnInit } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Chargez le widget de chatbot Dialogflow
    window.addEventListener('load', () => {
      const div = document.createElement('div');
      div.id = 'df-root';
      document.body.appendChild(div);
      const dfScript = document.createElement('script');
      dfScript.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      dfScript.setAttribute('data-asset', 'https://www.gstatic.com/dialogflow-console/fast/messenger/what_if_1x');
      dfScript.setAttribute('data-initial-state', '{"query":"Bonjour"}');
      dfScript.setAttribute('data-agent-id', 'VOTRE_AGENT_ID');
      document.body.appendChild(dfScript);
    });
  }

}
