export class LibraryCard {
    // Поля класса
    #cardNumber;
    #holderName;
    #issueDate;
    #isActive;

    constructor(cardNumber = '', holderName = '', issueDate = new Date()) {
        this.#cardNumber = cardNumber;
        this.#holderName = holderName;
        this.#issueDate = issueDate;
        this.#isActive = true;
    }

    // Геттеры
    get cardNumber() {
        return this.#cardNumber;
    }

    get holderName() {
        return this.#holderName;
    }

    get issueDate() {
        return this.#issueDate;
    }

    get isActive() {
        return this.#isActive;
    }

    // Сеттеры
    set cardNumber(value) {
        if (typeof value === 'string' && value.length > 0) {
            this.#cardNumber = value;
        } else {
            console.error('Card number must be a non-empty string');
        }
    }

    set holderName(value) {
        if (typeof value === 'string' && value.length >= 2) {
            this.#holderName = value;
        } else {
            console.error('Holder name must be at least 2 characters long');
        }
    }

    set issueDate(value) {
        if (value instanceof Date) {
            this.#issueDate = value;
        } else {
            console.error('Issue date must be a valid Date object');
        }
    }

    set isActive(value) {
        if (typeof value === 'boolean') {
            this.#isActive = value;
        }
    }

    // Публичные методы
    show() {
        console.log('=== Library Card Details ===');
        console.log(`Card Number: ${this.#cardNumber}`);
        console.log(`Holder Name: ${this.#holderName}`);
        console.log(`Issue Date: ${this.#issueDate.toLocaleDateString()}`);
        console.log(`Status: ${this.#isActive ? 'Active' : 'Inactive'}`);
        console.log('============================');
    }

    delete() {
        // Эмулируем удаление объекта
        Object.keys(this).forEach(key => {
            if (this[key] && typeof this[key] === 'function') {
                this[key] = null;
            }
        });
        console.log('Library card instance has been deleted');
        return null;
    }

    copy() {
        return this;
    }

    // Условно-приватный метод
    #generateCardNumber() {
        const prefix = 'LC';
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        this.#cardNumber = `${prefix}${timestamp}${random}`;
        console.log('New card number generated internally');
    }

    // Публичный метод для доступа к приватному (для демонстрации)
    generateNewCardNumber() {
        this.#generateCardNumber();
    }

    // Статичный метод
    static clone(original) {
        if (!(original instanceof LibraryCard)) {
            throw new Error('Can only clone LibraryCard instances');
        }
        return new LibraryCard(
            original.cardNumber,
            original.holderName,
            new Date(original.issueDate)
        );
    }

    // Дополнительный метод для проверки срока действия
    isValid() {
        const oneYearFromIssue = new Date(this.#issueDate);
        oneYearFromIssue.setFullYear(oneYearFromIssue.getFullYear() + 1);
        return this.#isActive && new Date() <= oneYearFromIssue;
    }
}
