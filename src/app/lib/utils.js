import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Remplace les espaces insécables collées entre les mots (copier-coller depuis
// Word ou un PDF) par des espaces normales, pour que le texte puisse revenir à
// la ligne. Celles de la typographie française (avant : ; ! ? » et après «)
// sont conservées.
export function normalizeSpaces(html) {
  if (!html) return html;
  return html.replace(
    /(&nbsp;| )(?![:;!?»]|&raquo;)/g,
    (match, nbsp, offset) => {
      const before = html.slice(Math.max(0, offset - 7), offset);
      return /(«|&laquo;)$/.test(before) ? match : " ";
    },
  );
}

// Convertit un texte brut (sauts de ligne, lignes commençant par « • » ou « - »)
// en HTML, pour les champs saisis avant l'éditeur riche. Un texte qui contient
// déjà des balises est renvoyé tel quel.
export function plainTextToHtml(text) {
  if (!text) return "";
  if (/<\/?[a-z][^>]*>/i.test(text)) return text;

  const escape = (str) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let html = "";
  let inList = false;
  for (const line of lines) {
    const bullet = line.match(/^[•·\-*]\s*(.*)$/);
    if (bullet) {
      if (!inList) html += "<ul>";
      inList = true;
      html += `<li>${escape(bullet[1])}</li>`;
    } else {
      if (inList) html += "</ul>";
      inList = false;
      html += `<p>${escape(line)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}
