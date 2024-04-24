export function isLink(str: string) {
  // Regular expression to match common URL patterns
  var urlPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

  // Test the string against the URL pattern
  return urlPattern.test(str);
}
