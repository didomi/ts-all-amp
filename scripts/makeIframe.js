function makeIframe(config, consentBlockingTagName = "") {
  if (!config) {
    return;
  }

  var iframe = `<!doctype html>
    <html amp lang="en">
      <head>
        <meta charset="utf-8">
        <script async custom-element="amp-consent" src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"></script>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <title>AMP Sandbox</title>
        <link rel="canonical" href="https://www.didomi.io">
        <meta name="amp-consent-blocking" content="${consentBlockingTagName}" />
        <style amp-custom>
            body{font-family:arial, sans-serif;padding:10px;}
            *{box-sizing:border-box;}
            .info{padding:20px;font-size:11px;}
            .info span{display:block;}
            .value{font-family:monospace;}
            .button{display:block;width:100px;margin:10px auto 10px auto;border-radius:3px;}
        </style>
        <meta name="viewport" content="width=device-width" />
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      </head>
      <body>
        <div class="info"><span class="title">ApiKey:</span><span class="value">${
          JSON.parse(config).clientConfig?.config?.app?.apiKey
        }</span></div>
        <div class="info"><span class="title">NoticeId:</span><span class="value">${
          JSON.parse(config).clientConfig?.noticeId
        }</span></div>
        <amp-consent id="didomi" layout="nodisplay" type="didomi">
          <script type="application/json">
            ${config}
          </script>
        </amp-consent>

        <div id="postPromptUI">
          <button class="button" on="tap:didomi.prompt()" role="button">Open notice</button>
        </div>
      </body>
    </html>`;

  window.ampHTML = iframe;
  document
    .querySelector("#iframe_container iframe")
    .setAttribute("srcdoc", iframe);
}
