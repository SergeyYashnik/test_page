class StateSwitcher {
    selectors = {
        root: '[data-select-state-js-root]',
        item: '[data-select-state-js-item]',
    };

    // Объект с CSS-классами состояний
    stateClasses = {
        isActive: 'is-active',
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);

        if (!this.rootElement) {
            return;
        }

        this.items = this.rootElement.querySelectorAll(this.selectors.item);

        this.bindEvents();
    }

    onStateItemClick = (event) => {
        const currentItem = event.currentTarget;

        this.items.forEach(item => {
            item.classList.remove(this.stateClasses.isActive);
        });

        currentItem.classList.add(this.stateClasses.isActive);


    };

    bindEvents() {
        // Проходим по каждому элементу и "вешаем" на него слушатель клика
        this.items.forEach(item => {
            item.addEventListener('click', this.onStateItemClick);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StateSwitcher();
});


class CustomSelect {
    selectors = {
        head: '[data-js-select-head]',
        current: '[data-js-select-current]',
        list: '[data-js-select-list]',
        item: '[data-js-select-item]',
    };

    stateClasses = {
        isOpen: 'is-open',
        isSelected: 'active',
    };

    constructor(element) {
        this.rootElement = element;
        this.headElement = this.rootElement.querySelector(this.selectors.head);
        this.currentElement = this.rootElement.querySelector(this.selectors.current);
        this.listElement = this.rootElement.querySelector(this.selectors.list);
        this.items = this.rootElement.querySelectorAll(this.selectors.item);

        this.init();
        this.bindEvents();
    }

    init() {
        const initiallySelectedItem = this.listElement.querySelector(`.${this.stateClasses.isSelected}`);
        if (initiallySelectedItem) {
            this.currentElement.textContent = initiallySelectedItem.textContent;
        }
    }

    toggle = () => {
        this.rootElement.classList.toggle(this.stateClasses.isOpen);
    };

    close = () => {
        this.rootElement.classList.remove(this.stateClasses.isOpen);
    };

    onHeadClick = () => {
        this.toggle();
    };

    onItemClick = (event) => {
        const selectedItem = event.currentTarget;

        this.currentElement.textContent = selectedItem.textContent;

        this.items.forEach(item => item.classList.remove(this.stateClasses.isSelected));
        selectedItem.classList.add(this.stateClasses.isSelected);

        this.close();
    };

    closeOnClickOutside = (event) => {
        if (!this.rootElement.contains(event.target)) {
            this.close();
        }
    };

    bindEvents() {
        this.headElement.addEventListener('click', this.onHeadClick);
        this.items.forEach(item => {
            item.addEventListener('click', this.onItemClick);
        });
        document.addEventListener('click', this.closeOnClickOutside);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selectElements = document.querySelectorAll('[data-js-select]');
    selectElements.forEach(element => {
        new CustomSelect(element);
    });
});


class RegionConfirmation {
    constructor(rootElement) {
        this.root = rootElement;
        if (!this.root) return;

        const list = this.root.closest('.nav-actions__list');

        this.confirmButton = this.root.querySelector('[data-region-confirm-btn]');
        this.questionElements = this.root.querySelectorAll('[data-region-question]');

        if (list) {
            this.changeRegionButton = list.querySelector('[data-change-region-btn]');
        }

        this.bindEvents();
    }

    handleConfirmation = () => {
        // Добавляем класс, который скрывает вопросы и кнопку "Да"
        this.root.classList.add('is-confirmed');

        // Находим и ПОКАЗЫВАЕМ кнопку "Изменить регион"
        if (this.changeRegionButton) {
            this.changeRegionButton.classList.remove('is-hidden');
        }
    };

    bindEvents() {
        if (this.confirmButton) {
            this.confirmButton.addEventListener('click', this.handleConfirmation);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const regionConfirmationElement = document.querySelector('[data-region-confirmation]');
    if (regionConfirmationElement) {
        new RegionConfirmation(regionConfirmationElement);
    }
});