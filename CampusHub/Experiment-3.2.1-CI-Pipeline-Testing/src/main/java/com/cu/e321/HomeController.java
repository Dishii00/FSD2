package com.cu.e321;

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
                <title>CI Pipeline Testing Experiment</title>
                <style>
                body{font:16px system-ui;max-width:680px;margin:48px auto;padding:0 20px;color:#172033}
                input,button{font:inherit;padding:10px;margin:5px 0}
                button{cursor:pointer}pre{background:#f1f5f9;padding:16px;white-space:pre-wrap}
                </style>
                <h1>Experiment 3.2.1: CI Pipeline Testing</h1>
                <p><a href="/api/health">Check API health</a></p>
                <form id="greeting-form">
                  <label>Name <input id="name" value="Student" required></label>
                  <button>Get greeting</button>
                </form>
                <pre id="result">Greeting will appear here.</pre>
                <script>
                document.getElementById('greeting-form').addEventListener('submit',async e=>{
                  e.preventDefault();
                  const q=new URLSearchParams({name:document.getElementById('name').value});
                  const r=await fetch('/api/greeting?'+q);
                  document.getElementById('result').textContent=await r.text();
                });
                </script>
                </html>
                """;
    }
}
