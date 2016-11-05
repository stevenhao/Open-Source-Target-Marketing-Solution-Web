var demographics = ['young people', 'old people', 'cool people', 'warm people'];

var Options = {
  controller: function() {
  },
  view: function(ctrl) {
    return m('.options', [
      m('h2', 'Options'),
      m('.category', [
        m('label', 'Category'),
        m('select', [
          m('option', 'Hi'),
          m('option', 'Bye'),
          m('option', 'Scott'),
        ]),
      ]),
      m('.demographics', demographics.map(function(demographic) {
        return m('.demographic', [
          m('label', demographic),
          m('input[type=checkbox]'),
        ]);
      })),
    ]);
  }
}

module.exports = Options;
