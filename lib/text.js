export const titleize = (str) => str.replace(/([a-z]+)([^a-z]*)/gi, (m, p1, p2) => p1.charAt(0).toUpperCase() + p1.substr(1).toLowerCase() + (p2 ? ' ' : ''));
