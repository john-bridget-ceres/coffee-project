"use strict";

//function addCoffee

function addCoffee(e) {
    e.preventDefault();
    var newCoffee = {
        id: coffees.length +1,
        name: addCoffeeName.value,
        roast: addCoffeeRoast.value
    };
    coffees.push(newCoffee);
    localStorage.setItem("customCoffees", JSON.stringify(coffees));
    divBody.innerHTML = renderCoffees(coffees);
}

// Create a single div to display one coffee

function renderCoffee(coffee) {
    var html =  '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

// Run through all the coffees in the coffee array, and call the function above to display them

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Display only coffees that match with selected roast type

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    JSON.parse(window.localStorage.getItem('customCoffees'));
    if(selectedRoast === 'all'){
        divBody.innerHTML = renderCoffees(coffees);
    }else{
        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        divBody.innerHTML = renderCoffees(filteredCoffees);
    }
}

//allow user to search for matching coffee names as they type

function searchCoffeeNames(e) {
    e.preventDefault();
    var userCoffeeName = document.getElementById("user-search").value;
    var filteredNames = [];
    coffees.forEach(function(coffee) {

        if(coffee.name.toLowerCase().includes(userCoffeeName.toLowerCase())){
                filteredNames.push(coffee);

        }
    });
    divBody.innerHTML = renderCoffees(filteredNames);
}

// When defining coffee variable -- check to see if coffee array exists (has been updated) in local storage

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
if(localStorage.getItem('customCoffees')=== null){
    var coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];

}else{
    var coffees = JSON.parse(window.localStorage.getItem('customCoffees'));
}

var divBody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchBar = document.querySelector('#user-search');
divBody.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
searchBar.addEventListener('input', searchCoffeeNames);
submitButton.addEventListener('click', searchCoffeeNames);

var addButton = document.querySelector("#add-coffee-submit");
var addCoffeeRoast = document.querySelector('#add-coffee-roast');
var addCoffeeName = document.querySelector('#add-coffee-input');

addButton.addEventListener('click', addCoffee);
