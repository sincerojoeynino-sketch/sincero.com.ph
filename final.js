document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM elements
    const expenseForm = document.getElementById('expense-form');
    // WARNING: 'name' and 'category' IDs are duplicated in your HTML. 
    // getElementById will only target the first occurrence (the label/input field).
    // The script will use the input/select that appears first in the DOM structure.
    const nameInput = document.querySelector('input[type="text"][id="name"]');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.querySelector('form select[id="category"]'); 
    const categoryFilter = document.getElementById('category-filter');
    
    const expenseList = document.getElementById('expense-list');
    const totalBalanceSpan = document.getElementById('total-balance');

    // Array to store expense objects
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // --- Core Functions ---

    // Load existing expenses and update total on initial load
    const init = () => {
        renderExpenses(expenses);
        updateTotal();
    };

    // Update Total Spent
    const updateTotal = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalBalanceSpan.textContent = total.toFixed(2);
    };

    // Save expenses to browser's local storage
    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Render Expenses to the List (handles both initial load and filtering)
    const renderExpenses = (expenseArray) => {
        expenseList.innerHTML = ''; // Clear existing list items

        if (expenseArray.length === 0 && expenses.length > 0) {
            // Only show if a filter is applied and yielded no results
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">No expenses found for this category.</li>';
             return;
        } else if (expenses.length === 0) {
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">Start by adding your first expense above!</li>';
             return;
        }

        expenseArray.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.classList.add('expense-item');
            
            // Set the list item content
            listItem.innerHTML = `
                <div class="expense-details">
                    <span class="expense-name">${expense.name}</span>
                    <span class="expense-category">(${expense.category})</span>
                </div>
                <div class="expense-actions">
                    <span class="expense-amount">₱${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${expense.id}">✖</button>
                </div>
            `;

            // Data attribute for styling/filtering helper (if needed in CSS)
            listItem.setAttribute('data-category', expense.category);
            expenseList.appendChild(listItem);
        });
    };
    
    // --- Event Handlers ---

    // Add Expense Handler
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values (amount is parsed to a float)
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        // Validation
        if (name === '' || isNaN(amount) || amount <= 0 || category === '') {
            alert('Please ensure Name, a positive Amount, and a Category are selected.');
            return;
        }

        // Create the new expense object
        const newExpense = {
            id: Date.now(), // Unique ID
            name,
            amount,
            category
        };

        // Update application state
        expenses.push(newExpense);
        saveExpenses();
        filterExpenses(); // Renders the list (respecting any active filter)
        updateTotal();

        // Clear the form
        expenseForm.reset();
        categorySelect.value = ''; // Reset the select to the disabled option
    });

    // Delete Expense Handler (using event delegation on the ul)
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const idToDelete = parseInt(e.target.dataset.id);

            // Filter out the expense to delete
            expenses = expenses.filter(expense => expense.id !== idToDelete);
            
            // Update application state
            saveExpenses();
            filterExpenses(); // Re-render the list
            updateTotal();
        }
    });

    // Category Filter Function and Handler
    const filterExpenses = () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory === 'All') {
            renderExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === selectedCategory);
            renderExpenses(filtered);
        }
    }
    
    categoryFilter.addEventListener('change', filterExpenses);

    // Initialize the application
    init();
});document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM elements
    const expenseForm = document.getElementById('expense-form');
    // WARNING: 'name' and 'category' IDs are duplicated in your HTML. 
    // getElementById will only target the first occurrence (the label/input field).
    // The script will use the input/select that appears first in the DOM structure.
    const nameInput = document.querySelector('input[type="text"][id="name"]');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.querySelector('form select[id="category"]'); 
    const categoryFilter = document.getElementById('category-filter');
    
    const expenseList = document.getElementById('expense-list');
    const totalBalanceSpan = document.getElementById('total-balance');

    // Array to store expense objects
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // --- Core Functions ---

    // Load existing expenses and update total on initial load
    const init = () => {
        renderExpenses(expenses);
        updateTotal();
    };

    // Update Total Spent
    const updateTotal = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalBalanceSpan.textContent = total.toFixed(2);
    };

    // Save expenses to browser's local storage
    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Render Expenses to the List (handles both initial load and filtering)
    const renderExpenses = (expenseArray) => {
        expenseList.innerHTML = ''; // Clear existing list items

        if (expenseArray.length === 0 && expenses.length > 0) {
            // Only show if a filter is applied and yielded no results
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">No expenses found for this category.</li>';
             return;
        } else if (expenses.length === 0) {
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">Start by adding your first expense above!</li>';
             return;
        }

        expenseArray.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.classList.add('expense-item');
            
            // Set the list item content
            listItem.innerHTML = `
                <div class="expense-details">
                    <span class="expense-name">${expense.name}</span>
                    <span class="expense-category">(${expense.category})</span>
                </div>
                <div class="expense-actions">
                    <span class="expense-amount">₱${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${expense.id}">✖</button>
                </div>
            `;

            // Data attribute for styling/filtering helper (if needed in CSS)
            listItem.setAttribute('data-category', expense.category);
            expenseList.appendChild(listItem);
        });
    };
    
    // --- Event Handlers ---

    // Add Expense Handler
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values (amount is parsed to a float)
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        // Validation
        if (name === '' || isNaN(amount) || amount <= 0 || category === '') {
            alert('Please ensure Name, a positive Amount, and a Category are selected.');
            return;
        }

        // Create the new expense object
        const newExpense = {
            id: Date.now(), // Unique ID
            name,
            amount,
            category
        };

        // Update application state
        expenses.push(newExpense);
        saveExpenses();
        filterExpenses(); // Renders the list (respecting any active filter)
        updateTotal();

        // Clear the form
        expenseForm.reset();
        categorySelect.value = ''; // Reset the select to the disabled option
    });

    // Delete Expense Handler (using event delegation on the ul)
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const idToDelete = parseInt(e.target.dataset.id);

            // Filter out the expense to delete
            expenses = expenses.filter(expense => expense.id !== idToDelete);
            
            // Update application state
            saveExpenses();
            filterExpenses(); // Re-render the list
            updateTotal();
        }
    });

    // Category Filter Function and Handler
    const filterExpenses = () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory === 'All') {
            renderExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === selectedCategory);
            renderExpenses(filtered);
        }
    }
    
    categoryFilter.addEventListener('change', filterExpenses);

    // Initialize the application
    init();
});document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM elements
    const expenseForm = document.getElementById('expense-form');
    // WARNING: 'name' and 'category' IDs are duplicated in your HTML. 
    // getElementById will only target the first occurrence (the label/input field).
    // The script will use the input/select that appears first in the DOM structure.
    const nameInput = document.querySelector('input[type="text"][id="name"]');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.querySelector('form select[id="category"]'); 
    const categoryFilter = document.getElementById('category-filter');
    
    const expenseList = document.getElementById('expense-list');
    const totalBalanceSpan = document.getElementById('total-balance');

    // Array to store expense objects
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // --- Core Functions ---

    // Load existing expenses and update total on initial load
    const init = () => {
        renderExpenses(expenses);
        updateTotal();
    };

    // Update Total Spent
    const updateTotal = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalBalanceSpan.textContent = total.toFixed(2);
    };

    // Save expenses to browser's local storage
    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Render Expenses to the List (handles both initial load and filtering)
    const renderExpenses = (expenseArray) => {
        expenseList.innerHTML = ''; // Clear existing list items

        if (expenseArray.length === 0 && expenses.length > 0) {
            // Only show if a filter is applied and yielded no results
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">No expenses found for this category.</li>';
             return;
        } else if (expenses.length === 0) {
             expenseList.innerHTML = '<li style="list-style: none; color: #555;">Start by adding your first expense above!</li>';
             return;
        }

        expenseArray.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.classList.add('expense-item');
            
            // Set the list item content
            listItem.innerHTML = `
                <div class="expense-details">
                    <span class="expense-name">${expense.name}</span>
                    <span class="expense-category">(${expense.category})</span>
                </div>
                <div class="expense-actions">
                    <span class="expense-amount">₱${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${expense.id}">✖</button>
                </div>
            `;

            // Data attribute for styling/filtering helper (if needed in CSS)
            listItem.setAttribute('data-category', expense.category);
            expenseList.appendChild(listItem);
        });
    };
    
    // --- Event Handlers ---

    // Add Expense Handler
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values (amount is parsed to a float)
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        // Validation
        if (name === '' || isNaN(amount) || amount <= 0 || category === '') {
            alert('Please ensure Name, a positive Amount, and a Category are selected.');
            return;
        }

        // Create the new expense object
        const newExpense = {
            id: Date.now(), // Unique ID
            name,
            amount,
            category
        };

        // Update application state
        expenses.push(newExpense);
        saveExpenses();
        filterExpenses(); // Renders the list (respecting any active filter)
        updateTotal();

        // Clear the form
        expenseForm.reset();
        categorySelect.value = ''; // Reset the select to the disabled option
    });

    // Delete Expense Handler (using event delegation on the ul)
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const idToDelete = parseInt(e.target.dataset.id);

            // Filter out the expense to delete
            expenses = expenses.filter(expense => expense.id !== idToDelete);
            
            // Update application state
            saveExpenses();
            filterExpenses(); // Re-render the list
            updateTotal();
        }
    });

    // Category Filter Function and Handler
    const filterExpenses = () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory === 'All') {
            renderExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === selectedCategory);
            renderExpenses(filtered);
        }
    }
    
    categoryFilter.addEventListener('change', filterExpenses);

    // Initialize the application
    init();
});