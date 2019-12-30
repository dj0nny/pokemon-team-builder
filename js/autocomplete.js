const autoCompletejs = new autoComplete({
  data: {
    src: async function () {
      const source = await fetch('../json/pokèmon.json');
      const data = await source.json();
      return data;
    },
    key: ['name'],
  },
  sort: function (a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  selector: '#autoComplete',
  debounce: 0,
  searchEngine: 'strict',
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: function (source) {
      source.setAttribute('id', 'autoComplete_list');
    },
    element: 'ul',
    destination: document.querySelector('#autoComplete'),
    position: 'afterend',
  },
  resultItem: {
    content: function (data, source) {
      source.innerHTML = data.match;
    },
    element: 'li',
  },
  noResults: function () {
    const result = document.createElement('li');
    result.setAttribute('class', 'no_result');
    result.setAttribute('tabindex', '1');
    result.innerHTML = 'No Results';
    document.querySelector('#autoComplete_list').appendChild(result);
  },
  onSelection: function (feedback) {
    document.querySelector('#autoComplete').blur();
    const selection = feedback.selection.value.name;
    document.querySelector('#autoComplete').innerHTML = selection;
    document.querySelector('#autoComplete').setAttribute('placeholder', selection);
    document.querySelector('#autoComplete').value = '';
  },
});