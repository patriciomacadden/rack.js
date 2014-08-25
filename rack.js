;(function() {
  Rack = {
    confirmSelectors: 'a[data-confirm]',

    methodSelectors: 'a[data-method]',

    confirmHandler: function(event) {
      answer = confirm(this.dataset.confirm);
      hasMethod = this.dataset.method != undefined;

      this.dataset.answer = answer;

      if (answer && !hasMethod) {
        return true;
      } else {
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
    },

    methodHandler: function(event) {
      event.preventDefault();

      form = document.createElement('form');
      form.action = this.href;
      form.method = 'POST';
      form.target = this.target || '_self';

      form.innerHTML = '<input type="hidden" name="_method" value="' + this.dataset.method + '"/>'

      if (this.dataset.confirm != undefined) {
        if (this.dataset.answer == "true") {
          form.submit();
        }
      } else {
        form.submit();
      }

      return false;
    },

    bindConfirmSelectors: function() {
      confirmElements = document.querySelectorAll(Rack.confirmSelectors);
      for (i = 0; i < confirmElements.length; i++) {
        confirmElements.item(i).addEventListener('click', Rack.confirmHandler);
      };
    },

    bindMethodSelectors: function() {
      methodElements = document.querySelectorAll(Rack.methodSelectors);
      for (i = 0; i < methodElements.length; i++) {
        methodElements.item(i).addEventListener('click', Rack.methodHandler);
      };
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    Rack.bindConfirmSelectors();
    Rack.bindMethodSelectors();
  });
})();
