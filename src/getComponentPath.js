var path = require('path')

const replaceSlashes = (path) => {

  return path.replaceAll(/\\/g, '/')
}

const getComponentPath = (path, paths, prefix, ignorePaths) => {
  const normalizedPath = replaceSlashes(path);
  if (ignorePaths.find(path => new RegExp(path).test(normalizedPath))) {
    return "";
  }

  const regexp = new RegExp(`(${paths.map(escapeRegExp).map(path => `(${path})`).join('|')})\\/(?<name>.*)\\.[jt]sx`, 'ui')
  const matches = normalizedPath.match(regexp);

  return matches ? `${prefix && `${prefix}.`}${matches.groups.name}` : "";
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

exports.default = getComponentPath;