books_array = [{
        name: "HP",
        price: 5,
        genre: "Mystery",
    },
    {
        name: "Goosebumps",
        price: 6,
        genre: "Thriller",
    },
    {
        name: "Captain Underpants",
        price: 7,
        genre: "Kids",
    },
]

/*
you can add stuff
you can delete stuff
every element can be edited
*/
class App {

    constructor(books) {
        this.books = books;
        this.print_all();
    }

    /*
    add takes in a javascript object
    appends it to array of objects (updating internal representation)

    reprints entire page
    */
    add(data) {
        this.books.push(data);
        this.print_all();
    }

    /*
    delete entry at specific index

    rerenders entire list
    */
    delete(pos) {

        // remove 1 element starting from index
        this.books.splice(pos, 1);
        this.print_all();
    }

    /*
    just replace the javasript object at index

    rerender entire list

    */
    edit(data, pos) {
        // remove 1 element from index pos, then add object data at that location
        this.books.splice(pos, 1, data);
        this.print_all()
    }

    /*
    delete list on screen, then print everything
    */
    print_all() {
        let books_list = document.getElementById('books_list');

        this.removeChildNodes(books_list);

        if (this.books.length == 0) {
            no_books_message.hidden = false;
        } else {
            no_books_message.hidden = true;
        }

        //this.books.forEach(element => {
        /*});*/
        for (let i = 0; i < this.books.length; i++) {
            let element = this.books[i];
            books_list.insertAdjacentHTML('beforeend', `<li>${element.name} - Price: ${element.price} - Genre: ${element.genre} <span id="edit_${i}" class="edit">Edit</span> <span id="delete_${i}">Delete</span></li>`);

            let deleteButton = document.getElementById(`delete_${i}`);
            deleteButton.addEventListener('click', () => {
                this.delete(i)
            });

            let editButton = document.getElementById(`edit_${i}`);
            editButton.addEventListener('click', () => {
                edit_button_clicked(i, element.name, element.price, element.genre);
            });
        }
    }

    removeChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}


/**
 * helper function that populates dialog fields
 */
function set_dialog_fields(add_or_edit, name, price, genre) {
    let state = "add";
    if (!add_or_edit) {
        state = "edit";
    }

    document.getElementById(`${state}_name_input`).value = name;
    document.getElementById(`${state}_price_input`).value = price;
    document.getElementById(`${state}_genre_input`).value = genre;
}

/**
 * helper function to get values from input fields
 */
function get_dialog_fields(add_or_edit) {
    let state = "add";
    if (!add_or_edit) {
        state = "edit";
    }
    return {
        name: document.getElementById(`${state}_name_input`).value,
        price: document.getElementById(`${state}_price_input`).value,
        genre: document.getElementById(`${state}_genre_input`).value
    }
}

// retrieve the dialog elements
let add_dialog = document.getElementById("add_dialog");
let edit_dialog = document.getElementById("edit_dialog");

// retrieve the add button element
let add_button = document.getElementById("add_button");


// handle add
function add_button_clicked() {
    set_dialog_fields(true, "", "", "");
    add_dialog.showModal();
}

function add_save_clicked(pos) {
    add_dialog.close();
    let data = get_dialog_fields();
    setTimeout(() => application.add(data), 0);
}

function add_cancel_clicked() {
    add_dialog.close();
}

// add event listeners to the buttons
document.getElementById('add_button').addEventListener('click', add_button_clicked);
document.getElementById('add_cancel').addEventListener('click', add_cancel_clicked);
document.getElementById('add_save').addEventListener('click', add_save_clicked);

// index of element being edited
let edited_index = -1;

// handle edit
function edit_button_clicked(pos, name, price, genre) {
    set_dialog_fields(false, name, price, genre);
    edited_index = pos;
    edit_dialog.showModal();
}

function edit_save_clicked() {
    edit_dialog.close();
    let data = get_dialog_fields(false);
    setTimeout(() => application.edit(data, edited_index), 0);
}

function edit_cancel_clicked() {
    edit_dialog.close();
}

document.getElementById('edit_cancel').addEventListener('click', edit_cancel_clicked);
document.getElementById('edit_save').addEventListener('click', edit_save_clicked);

let no_books_message = document.getElementById("no_books");

// program starts running
let application = new App(books_array);