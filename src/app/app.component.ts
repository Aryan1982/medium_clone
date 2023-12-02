import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  words: string[] = [];
  eventSource!: EventSource;
  newMessage: string = '';

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    
  }
  

  ngOnDestroy() {
    this.eventSource.close();
  }

  sendMessage() {
    this.words = []
    const payload = { message: this.newMessage };

    // Construct the EventSource URL with query parameters
    const eventSourceUrl = `http://localhost:5000/chat?payload=${encodeURIComponent(JSON.stringify(payload))}`;
    
    this.eventSource = new EventSource(eventSourceUrl);

    this.eventSource.onmessage = (event) => {
      this.ngZone.run(() => {
        const newWords = event.data.split('\n').map((word: any) => word.trim()).filter(Boolean);

        // Check if the payload is present
        if (event.data.startsWith('data:')) {
          const payloadData = JSON.parse(event.data.replace('data:', '').trim());
          // Use payloadData as needed
          console.log('Received payload:', payloadData);
        }

        this.words.push(...newWords);
      });
    };

    this.eventSource.onerror = (error) => {
      this.ngZone.run(() => {
        console.error('Error in SSE connection:', error);
        this.eventSource.close();
      });
    };
   return
  }

  getText(text:any){
    return text.replace(/\n/g,'<br>')

  }
}
