package com.cu.e322;

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
                <title>Canary Release Experiment</title>
                <style>
                body{font:16px system-ui;max-width:680px;margin:48px auto;padding:0 20px;color:#172033}
                button{font:inherit;padding:10px;cursor:pointer;margin:5px 0}
                pre{background:#f1f5f9;padding:16px;white-space:pre-wrap}
                </style>
                <h1>Experiment 3.2.2: Docker Canary Release</h1>
                <p>Refresh to observe stable and canary release routing.</p>
                <button id="check">Check release</button>
                <p><a href="/api/health">API health</a></p>
                <pre id="result">Click “Check release” to see the routed version.</pre>
                <script>
                document.getElementById('check').addEventListener('click',async()=>{
                  const r=await fetch('/api/release');
                  document.getElementById('result').textContent=await r.text();
                });
                </script>
                </html>
                """;
    }
}
