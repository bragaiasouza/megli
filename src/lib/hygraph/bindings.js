function getValueByPath(source, path) {
  return path.split('.').reduce(function (accumulator, key) {
    if (accumulator == null) {
      return undefined;
    }

    return accumulator[key];
  }, source);
}

export function bindHygraphFields(payload, root) {
  if (!payload) {
    return;
  }

  var scope = root || document;

  scope.querySelectorAll('[data-hg-text]').forEach(function (node) {
    var value = getValueByPath(payload, node.dataset.hgText);

    if (typeof value === 'string' || typeof value === 'number') {
      node.textContent = value;
    }
  });

  scope.querySelectorAll('[data-hg-html]').forEach(function (node) {
    var value = getValueByPath(payload, node.dataset.hgHtml);

    if (typeof value === 'string') {
      node.innerHTML = value;
    }
  });

  scope.querySelectorAll('[data-hg-image]').forEach(function (node) {
    var value = getValueByPath(payload, node.dataset.hgImage);

    if (!value) {
      return;
    }

    if (node.tagName === 'IMG') {
      node.src = value.url || value;
      node.alt = value.alt || node.alt || '';
    }
  });
}
