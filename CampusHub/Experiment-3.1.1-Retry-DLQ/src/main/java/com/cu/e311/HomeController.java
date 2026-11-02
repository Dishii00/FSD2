package com.cu.e311;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home() {
        return """
                <!doctype html>
                <html lang="en">
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Retry and DLQ Experiment</title>
                <style>
                body{font:16px system-ui;max-width:680px;margin:48px auto;padding:0 20px;color:#172033}
                input,select,button{font:inherit;padding:10px;margin:5px 0}
                button{cursor:pointer}pre{background:#f1f5f9;padding:16px;white-space:pre-wrap}
                </style>
                <h1>Experiment 3.1.1: Kafka Retry and DLQ</h1>
                <p>Send a normal event or trigger retries and the dead-letter queue.</p>
                <form id="event-form">
                  <label>Event type <select id="type"><option>normal</option><option>fail</option></select></label><br>
                  <label>Message <input id="message" value="hello" required></label><br>
                  <button>Send event</button>
                </form>
                <pre id="result">Result will appear here.</pre>
                <script>
                document.getElementById('event-form').addEventListener('submit',async e=>{
                  e.preventDefault();
                  const q=new URLSearchParams({type:document.getElementById('type').value,message:document.getElementById('message').value});
                  const r=await fetch('/api/events?'+q,{method:'POST'});
                  document.getElementById('result').textContent=await r.text();
                });
                </script>
                </html>
                """;
    }
}
