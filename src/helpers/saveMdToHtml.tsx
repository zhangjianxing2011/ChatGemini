import { saveAs } from "file-saver";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

export const saveMdToHtml = (data: string, name: string) => {
    const md = new Remarkable("full", {
        html: false,
        breaks: false,
        xhtmlOut: false,
        typographer: true,
        linkTarget: "_blank",
        langPrefix: "language-",
    }).use(linkify);
    const result = md.render(data);
    const html = `<html>
    <head>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <title>${name}</title>
        <script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script>
            const PDF_OPTIONS = {
                filename: "${name}.pdf",
                margin: 1,
                image: {
                    type: "jpeg",
                    quality: 1,
                },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
                pagebreak: {
                    mode: ["avoid-all", "css", "legacy"],
                },
            };

            const fnDebounce = (func, timeout = 300) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, args);
                    }, timeout);
                };
            };

            const savePageToPDF = fnDebounce(async (options) => {
                const buttonElement = document.querySelector("nav button");
                if (buttonElement.disabled) {
                    return;
                }
                buttonElement.disabled = true;
                buttonElement.innerText = "正在生成 PDF";

                const targetElement = document.querySelector("main");
                const worker = html2pdf().set(options).from(targetElement);
                await worker.save();

                buttonElement.disabled = false;
                buttonElement.innerText = "转存完成";

                setTimeout(() => {
                    buttonElement.innerText = "转存 PDF";
                }, 2000);
            });

            const main = () => {
                hljs.highlightAll();
            };

            main();
        </script>
        <link
            rel="stylesheet"
            href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/a11y-light.min.css"
        />
        <style>
            .app {
                color: #111827;
                background-color: #fff;
                word-wrap: break-word;
            }

            .app nav {
                padding: 10px;
            }

            .app nav button {
                border: 0;
                padding: 10px 20px;
                color: #fff;
                background-color: #3b82f6;
                border-radius: 5px;
                font-weight: 500;
                cursor: pointer;
            }

            .app nav button:hover {
                background-color: #2563eb;
            }

            .app nav button:disabled {
                background-color: #a5b4fc;
                cursor: not-allowed;
            }

            .app main {
                padding: 0px 10px 0px 10px;
            }

            .app main a {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
            }

            .app main a:hover {
                text-decoration: underline;
            }

            .app main pre {
                padding: 10px;
                overflow-x: auto;
                background-color: #f3f4f6;
            }
        </style>
    </head>
    <body>
        <div class="app">
            <nav>
                <button onclick="savePageToPDF(PDF_OPTIONS)">转存 PDF</button>
            </nav>
            <main>${result}</main>
        </div>
    </body>
</html>
`;

    const blob = new Blob([html], {
        type: "applicetion/pdf",
    });
    saveAs(blob, `${name}.html`);
};