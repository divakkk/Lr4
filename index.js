import { StudentLibraryCard } from './studentLibraryCard.js';

// Создаем массив из 2 экземпляров класса с разными значениями
const studentCards = [
    new StudentLibraryCard('LC20240001', 'Иван Петров', new Date('2024-01-15'), 'STU001', 3),
    new StudentLibraryCard('LC20240002', 'Мария Сидорова', new Date('2024-01-10'), 'STU002', 5)
];

// Вызываем метод show для обоих экземпляров
console.log('=== Displaying Student Card 1 ===');
studentCards[0].show();

console.log('=== Displaying Student Card 2 ===');
studentCards[1].show();

// Демонстрация дополнительных возможностей
console.log('=== Additional Demonstrations ===');

// Демонстрация работы с книгами
console.log('--- Book Operations ---');
studentCards[0].borrowBook('JavaScript: The Good Parts');
studentCards[0].borrowBook('Clean Code');
studentCards[0].borrowBook('Design Patterns');
studentCards[0].borrowBook('Another Book'); // Должно показать ошибку - превышен лимит

studentCards[1].borrowBook('Introduction to Algorithms');
studentCards[1].borrowBook('Database Systems');

// Показываем обновленную информацию
console.log('--- Updated Cards ---');
studentCards[0].show();
studentCards[1].show();

// Демонстрация возврата книги
console.log('--- Returning Books ---');
studentCards[0].returnBook('Clean Code');
studentCards[0].show();

// Демонстрация геттеров и сеттеров
console.log('--- Getters and Setters ---');
console.log('Card 1 holder:', studentCards[0].holderName);
studentCards[0].holderName = 'Иван Петров (изменено)';
console.log('Updated card 1 holder:', studentCards[0].holderName);

console.log('Card 1 max books:', studentCards[0].maxBooks);
studentCards[0].maxBooks = 4;
console.log('Updated card 1 max books:', studentCards[0].maxBooks);

// Демонстрация available slots
console.log('Card 1 available slots:', studentCards[0].getAvailableSlots());

// Демонстрация копирования
console.log('--- Copy and Clone ---');
const cardCopy = studentCards[0].copy();
console.log('Copy reference comparison:', cardCopy === studentCards[0]);

// Демонстрация клонирования
const cardClone = StudentLibraryCard.clone(studentCards[0]);
console.log('Clone reference comparison:', cardClone === studentCards[0]);
cardClone.show();

// Демонстрация генерации номера карты
console.log('--- Card Number Generation ---');
studentCards[0].generateNewCardNumber();
studentCards[0].show();

// Демонстрация проверки валидности
console.log('--- Validity Check ---');
console.log('Card 1 is valid:', studentCards[0].isValid());

// Создаем просроченную карту для демонстрации
const oldCard = new StudentLibraryCard('LC20230001', 'Старый Студент', new Date('2023-01-01'), 'STU999', 3);
console.log('Old card is valid:', oldCard.isValid());

console.log('=== All operations completed ===');
