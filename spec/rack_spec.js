describe('rack', function() {
  describe('confirmSelectors', function() {
    it('returns a selector string', function() {
      expect(Rack.confirmSelectors).toEqual('a[data-confirm]');
    });

    it('can be changed', function() {
      Rack.confirmSelectors = 'a[data-confirm], button[data-confirm]';
      expect(Rack.confirmSelectors).toEqual('a[data-confirm], button[data-confirm]');
    });
  });

  describe('methodSelectors', function() {
    it('returns a selector string', function() {
      expect(Rack.methodSelectors).toEqual('a[data-method]');
    });

    it('can be changed', function() {
      Rack.methodSelectors = 'a[data-method], button[data-method]';
      expect(Rack.methodSelectors).toEqual('a[data-method], button[data-method]');
    });
  });

  describe('confirmHandler', function() {
    beforeEach(function() {
      link = document.createElement('a');
      link.href = 'http://www.google.com';
      link.dataset.confirm = 'Are you sure?';
      link.innerHTML = 'Go to google';
      document.body.appendChild(link);
      Rack.bindConfirmSelectors();
    });

    afterEach(function() {
      document.body.removeChild(link);
    });

    it("doesn't follow the link if the user doesn't confirm", function() {
      loc = window.location;
      spyOn(window, 'confirm').and.returnValue(false);
      link.click();
      expect(window.location).toEqual(loc);
    });

    it('follows the link if the user confirms', function() {
      spyOn(window, 'confirm').and.returnValue(true);

      custom_window = { location: 'http://www.google.com' };

      (function(window) {
        spyOn(link, 'click').and.callFake(function() {
          return false;
        });
        link.click();
        expect(window.location).toEqual('http://www.google.com');
      })(custom_window);

    });
  });

  describe('methodHandler', function() {
    beforeEach(function() {
      link = document.createElement('a');
      link.href = '/delete';
      link.dataset.method = 'delete';
      link.innerHTML = 'Go to google';
      document.body.appendChild(link);
      Rack.bindMethodSelectors();
    });

    afterEach(function() {
      document.body.removeChild(link);
    });

    it('creates a form object and submits it', function() {
      custom_window = { location: '/delete' };

      (function(window) {
        spyOn(link, 'click').and.stub();
        link.click();
        expect(window.location).toEqual('/delete');
      })(custom_window);
    });
  });

  describe('confirmHandler and methodHandler together', function() {
    beforeEach(function() {
      link = document.createElement('a');
      link.href = '/delete';
      link.dataset.confirm = 'Are you sure?';
      link.dataset.method = 'delete';
      link.innerHTML = 'Go to google';
      document.body.appendChild(link);
      Rack.bindConfirmSelectors();
      Rack.bindMethodSelectors();
    });

    afterEach(function() {
      document.body.removeChild(link);
    });

    it("creates a form object but it doesn't submits it if the user doesn't confirm", function() {
      loc = window.location;
      spyOn(window, 'confirm').and.returnValue(false);
      link.click();
      expect(window.location).toEqual(loc);
    });

    it('creates a form object and submits it if the user confirms', function() {
      spyOn(window, 'confirm').and.returnValue(true);

      custom_window = { location: '/delete' };

      (function(window) {
        spyOn(link, 'click').and.callFake(function() {
          return false;
        });
        link.click();
        expect(window.location).toEqual('/delete');
      })(custom_window);

    });
  });
});
