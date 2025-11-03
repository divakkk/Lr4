import { LibraryCard } from './libraryCard.js';

export class StudentLibraryCard extends LibraryCard {
    #studentId;
    #maxBooks;
    #borrowedBooks;

    constructor(cardNumber = '', holderName = '', issueDate = new Date(), studentId = '', maxBooks = 5) {
        super(cardNumber, holderName, issueDate);
        this.#studentId = studentId;
        this.#maxBooks = maxBooks;
        this.#borrowedBooks = [];
    }

    // Геттер для studentId
    get studentId() {
        return this.#studentId;
    }

    // Сеттер для studentId
    set studentId(value) {
        if (typeof value === 'string' && value.length > 0) {
            this.#studentId = value;
        } else {
            console.error('Student ID must be a non-empty string');
        }
    }

    // Геттер для maxBooks
    get maxBooks() {
        return this.#maxBooks;
    }

    // Сеттер для maxBooks
    set maxBooks(value) {
        if (typeof value === 'number' && value > 0) {
            this.#maxBooks = value;
        } else {
            console.error('Max books must be a positive number');
        }
    }

    // Геттер для borrowedBooks (только чтение)
    get borrowedBooks() {
        return [...this.#borrowedBooks]; // возвращаем копию массива
    }

    // Переопределяем метод show()
    show() {
        console.log('=== Student Library Card Details ===');
        console.log(`Card Number: ${this.cardNumber}`);
        console.log(`Holder Name: ${this.holderName}`);
        console.log(`Student ID: ${this.#studentId}`);
        console.log(`Issue Date: ${this.issueDate.toLocaleDateString()}`);
        console.log(`Status: ${this.isActive ? 'Active' : 'Inactive'}`);
        console.log(`Max Books: ${this.#maxBooks}`);
        console.log(`Currently Borrowed: ${this.#borrowedBooks.length} books`);
        console.log(`Borrowed Books: ${this.#borrowedBooks.join(', ') || 'None'}`);
        console.log(`Card Valid: ${this.isValid() ? 'Yes' : 'No'}`);
        console.log('====================================');
    }

    // Переопределяем метод delete()
    delete() {
        console.log(`Student library card ${this.cardNumber} for ${this.holderName} has been deleted`);
        return super.delete();
    }

    // Переопределяем метод copy()
    copy() {
        const copy = super.copy();
        console.log(`Created reference to student library card ${this.cardNumber}`);
        return copy;
    }

    // Переопределяем статичный метод clone()
    static clone(original) {
        if (!(original instanceof StudentLibraryCard)) {
            throw new Error('Can only clone StudentLibraryCard instances');
        }
        const clone = new StudentLibraryCard(
            original.cardNumber,
            original.holderName,
            new Date(original.issueDate),
            original.studentId,
            original.maxBooks
        );
        
        // Копируем массив borrowedBooks
        original.borrowedBooks.forEach(book => {
            clone.#borrowedBooks.push(book);
        });
        
        return clone;
    }

    // Новые методы для работы с книгами
    borrowBook(bookTitle) {
        if (this.#borrowedBooks.length >= this.#maxBooks) {
            console.error(`Cannot borrow more than ${this.#maxBooks} books`);
            return false;
        }
        
        if (this.#borrowedBooks.includes(bookTitle)) {
            console.error('Book is already borrowed');
            return false;
        }
        
        this.#borrowedBooks.push(bookTitle);
        console.log(`Book "${bookTitle}" borrowed successfully`);
        return true;
    }

    returnBook(bookTitle) {
        const index = this.#borrowedBooks.indexOf(bookTitle);
        if (index === -1) {
            console.error('Book not found in borrowed list');
            return false;
        }
        
        this.#borrowedBooks.splice(index, 1);
        console.log(`Book "${bookTitle}" returned successfully`);
        return true;
    }

    getAvailableSlots() {
        return this.#maxBooks - this.#borrowedBooks.length;
    }

    // Удаляем приватный метод родительского класса
    // generateNewCardNumber() не переопределяем, оставляем как есть
}
