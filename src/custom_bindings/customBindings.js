ko.bindingHandlers.handleActiveClass = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        let shouldDisplay = ko.unwrap(valueAccessor());
        
        if (shouldDisplay) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }

        window.addEventListener('scroll', function() {
            element.classList.remove('active');
            viewModel.showMenu(false);
        });

        // document.addEventListener('click', function(event) {
        //     if (!element.contains(event.target)) {
        //         element.classList.remove('active');
        //         viewModel.showMenu(false);
        //     }
        // });
    }
};