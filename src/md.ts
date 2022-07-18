// import 'highlight.js/styles/github.css';
import { marked } from "marked";
import hljs from "highlight.js/lib/common";
import template from "./template";

const options: marked.MarkedOptions = {
  highlight: function (code, language) {
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
};

marked.setOptions(options);

export const md = template(
  function (string) {
    const root = document.createElement("div");
    root.innerHTML = marked.parse(string).trim();
    return root;
  },
  function () {
    return document.createElement("div");
  }
);
export const mdi = template(
  function (string) {
    const root = document.createElement("div");
    root.innerHTML = marked.parseInline(string).trim();
    return root;
  },
  function () {
    return document.createElement("div");
  }
);
