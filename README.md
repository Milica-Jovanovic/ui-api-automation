To run the tests, you will need to have:
    - IDE (VS Code) 
    - Node.js installed (version higher than 18)
    - Playwright installed
  
 To run the tests headless in all three browsers (Chromium, Firefox, and WebKit):
       npx playwright test
  
 To run the tests headless only in Chromium:
       npx playwright test --project=chromium

 To run the tests only in Chromium:
       npx playwright test --project=chromium --headed

 To run in debug mode:
       npx playwright test --project=chromium --debug

 To run in codegen mode:
       npx playwright codegen {url}