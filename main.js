
var iso = new Isotope( '.grid', {
  itemSelector: '.cocktail',
  filter: function(itemElem) {
    var isMatched = true;

    for (var prop in filters) {
      var filter = filters[prop];
      filter = filterFns[filter] || filter;
      var filterType = typeof filter;
      if (filter && filterType == 'function') {
        isMatched = filter(itemElem);
      } else if (filter) {
        isMatched = matchesSelector(itemElem, filter);
      }
      if (!isMatched) {
        break;
      }
    }
    return isMatched;
  }
});

// filter functions
var filterFns = {
  greaterThan50: function( itemElem ) {
    var number = itemElem.querySelector('.number').textContent;
    return parseInt( number, 10 ) > 50;
  },
  even: function( itemElem ) {
    var name = itemElem.querySelector('.name').textContent;
    return parseInt( number, 10 ) % 2 === 0;
  }
};

// https://codepen.io/desandro/pen/pOjMdx

var filters = {};

document.querySelector('#filters').addEventListener('click', function(event) {
  if(!matchesSelector(event.target, 'button')) {
    return;
  }
  var buttonGroup = event.target.parentNode;
  var filterGroup = buttonGroup.getAttribute('data-filter-group');
  iso.arrange();
});

var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function(event) {
    if (!matchesSelector(event.target, 'button')) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}

function like(x) {
  x.classList.toggle("fas");
}
