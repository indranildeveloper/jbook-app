// TODO: Serve HTML from a different server endpoint
export const htmlTemplate = /*html*/ `
  <html>
      <head>
        <title>HTML TEMPLATE</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (error) => {
            const root = document.querySelector("#root");
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
                console.error(error);
          };

          window.addEventListener("error", (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          
          window.addEventListener("message", (event) => {
            try{
              eval(event.data);
            } catch (error) {
              handleError(error);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
