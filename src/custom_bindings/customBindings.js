ko.bindingHandlers.handleMenuActiveClass = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {},
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        let shouldDisplay = ko.unwrap(valueAccessor());
        
        const scrollListener = function() {
            element.classList.remove('active');
            viewModel.showMenu(false);
        };
        
        if (shouldDisplay) {
            element.classList.add('active');

            window.addEventListener('scroll', scrollListener, { once: true });
        } else {
            element.classList.remove('active');
        }
    },
};