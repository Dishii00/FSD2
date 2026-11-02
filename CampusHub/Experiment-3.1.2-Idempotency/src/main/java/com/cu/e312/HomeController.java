package com.cu.e312;

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
                <title>Payment Idempotency Experiment</title>
                <style>
                body{font:16px system-ui;max-width:680px;margin:48px auto;padding:0 20px;color:#172033}
                input,button{font:inherit;padding:10px;margin:5px 0}
                button{cursor:pointer}pre{background:#f1f5f9;padding:16px;white-space:pre-wrap}
                </style>
                <h1>Experiment 3.1.2: Payment Idempotency</h1>
                <p>Send the same event ID twice; the consumer processes it only once.</p>
                <form id="payment-form">
                  <label>Event ID <input id="eventId" value="PAY-101" required></label><br>
                  <label>Amount <input id="amount" value="500" required></label><br>
                  <button>Send payment</button>
                </form>
                <pre id="result">Result will appear here.</pre>
                <script>
                document.getElementById('payment-form').addEventListener('submit',async e=>{
                  e.preventDefault();
                  const q=new URLSearchParams({eventId:document.getElementById('eventId').value,amount:document.getElementById('amount').value});
                  const r=await fetch('/api/payments?'+q,{method:'POST'});
                  document.getElementById('result').textContent=await r.text();
                });
                </script>
                </html>
                """;
    }
}
