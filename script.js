// select elements
const balanceEL = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// select buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//inputs
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

//variables
let ENTRY_LIST = [];
let balance = 0, income = 0, outcome = 0;

const DELETE = "delete", EDIT = "edit";

//event listeners
expenseBtn.addEventListener("click", function(){
    show(expenseEl);
    hide( [incomeEl, allEl] );
    active( expenseBtn );
    inactive( [incomeBtn, allBtn] );
})
incomeBtn.addEventListener("click", function(){
    show(incomeEl);
    hide( [expenseEl, allEl] );
    active( incomeBtn );
    inactive( [expenseBtn, allBtn] );
})
allBtn.addEventListener("click", function(){
    show(allEl);
    hide( [incomeEl, expenseEl] );
    active( allBtn );
    inactive( [incomeBtn, expenseBtn] );
})

//good


addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;

    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);

    updateUI()
    clearInput( [expenseTitle, expenseAmount] )
})

addIncome.addEventListener("click", function(){
    //if one of the inputs is empty => exit
    if(!incomeTitle.value || !incomeAmount.value) return;

//save the entry to entry_list
let income = {
    type : "income",
    title : incomeTitle.value,
    amount : parseFloat(incomeAmount.value)
}
    ENTRY_LIST.push(income);

    updateUI()
    clearInput( [incomeTitle, incomeAmount] )
})

//goods

//helpers
//update and clear function
function updateUI(){
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outcome));

//update UI
    clearElement( [expenseList, incomeList, allList] );

    //determine sign of balance
    let sign = (income >= outcome) ? "₱" : "-₱";

    balanceEL.innerHTML = `<small>${sign}</small>${balance}`;
    outcomeTotalEl.innerHTML = `<small>₱</small>${outcome}`;
    incomeTotalEl.innerHTML = `<small>₱</small>${income}`;

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });
}

function showEntry(list, type, title, amount, id){

    const entry = `<li id="${id}" class="${type}">
                        <div class="entry">${title}: ₱${amount}</div>
                        <div id="edit"></div>
                        <div id="delete";></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}

function calculateTotal(type, list){
    let sum = 0;

    list.forEach(entry => {
        if ( entry.type == type ){
            sum += entry.amount;
        }
    })
    return sum;
}

//goods

function calculateBalance(income, outcome){
    return income - outcome;
}

function clearInput(inputs){
    inputs.forEach( input => {
        input.value ="";
    })
}


function show(element){
    element.classList.remove("hide");
}

function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide");
    });
}

function active(element){
    element.classList.add("active");
}

function inactive(elements){
    elements.forEach(element => {
        element.classList.remove("active");
    })
}

// function deleteTask(index){
//     let getLocalStorage = localStorage.getItem("New Todo");
//     listArr = JSON.parse(getLocalStorage);
//     listArr.splice(index, 1); //delete or remove the specific indexed li
//     // after remove li again update the localStorage
//     localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
//     showTask()
// }