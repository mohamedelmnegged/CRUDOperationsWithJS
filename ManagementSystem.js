var title = document.getElementById('title');
var price = document.getElementById('price');
var taxs = document.getElementById('taxs');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var count = document.getElementById('count');
var category = document.getElementById('category');
var create = document.getElementById('create'); 
var total = document.getElementById('total');

//total 
function getTotal(){ 
    if(price.value != 0){
        let counttoatl = (+price.value + +taxs.value + +ads.value) - (+discount.value); 
        total.innerHTML = counttoatl;
        total.style.backgroundColor = 'rgb(13, 145, 53)';
    }else{ 
        total.innerHTML = ''
        total.style.backgroundColor = 'rgb(228, 44, 44)';    
    }
}

let data = [] 
if(localStorage.data.length > 2){
    data = JSON.parse(localStorage.data);
    showData();    
}

//create 
create.onclick = function(){ 
    if(validate() ){
       let counter = 1; 
       if(count.value > 0){
            counter = count.value
       }
        for(var i = 0; i<counter; i++){
            let product = { 
                title : title.value, 
                price : price.value, 
                taxs : taxs.value,
                ads  : ads.value, 
                discount : discount.value, 
                category : category.value, 
                total : total.innerHTML
            }
            data.push(product)
        }
        localStorage.data = JSON.stringify(data);
       
        document.getElementById('error').style = 'display:none';
       
        clearInput(); 

        showData(); 
    }else{ 
        document.getElementById('error').style = 'display:flex';
    }
   
}

//clear input  
function clearInput(){ 
    title.value = ''; 
    price.value = ''; 
    discount.value = ''; 
    taxs.value = ''; 
    ads.value = ''; 
    category.value = ''; 
    count.value = ''; 
    total.innerHTML = ''; 
}

//validate data 
function validate(){ 
    if(title.value == '' || price.value == '' || category.value == ''){
        return false;
    }
    return true; 
}
//read data 
function showData(){ 
    if(data.length > 0){
        document.getElementById('deleteAll').style = 'display:block';
    }else{
        document.getElementById('deleteAll').style = 'display:none';
    }
    let table = ''; 
    for(var i = 0; i< data.length; i++){ 
        table += `
            <tr> 
                <td> ${i}  </td>
                <td> ${ data[i].title} </td>
                <td> ${ data[i].price} </td>
                <td> ${ data[i].taxs} </td>
                <td> ${ data[i].ads} </td>
                <td> ${ data[i].discount} </td>
                <td> ${ data[i].total} </td>
                <td> ${ data[i].category} </td>
                <td> 
                    <button onclick='updateItem(${i})'> update</button>    
                </td>
                <td>
                    <button   onclick='deleteItem(${i})' id="delete"> delete</button>    
                </td>
                </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table; 
}

//delete data 
function deleteItem(i){ 
    console.log('here', i)
    data.pop(i);
    localStorage.data = JSON.stringify(data); 
    showData(); 
}

function deleteAll(){ 
    data = []; 
    localStorage.data = data; 
    showData(); 
}

function addValuesToInputs(item){
    title.value = item.title; 
    price.value = item.price; 
    taxs.value  = item.taxs; 
    ads.value   = item.ads; 
    discount.value = item.discount; 
    category.value = item.category;
    getTotal();
} 

function addInputsToValues(i){
    data[i].title = title.value ; 
    data[i].price = price.value ; 
    data[i].taxs = taxs.value; 
    data[i].ads = ads.value; 
    data[i].discount = discount.value; 
    data[i].category = category.value;
    data[i].total = total.innerHTML; 
}
//update 
function updateItem(i){
    var item = data[i]; 
    if(item != null){
        let check = document.getElementById('update'); 
        if(check == null){
            let update = document.createElement('button');
            update.textContent = 'update';
            update.setAttribute('id', 'update');
            console.log(item);
            addValuesToInputs(item);
            update.onclick = function(){
                // here to update the values 
                if(validate()){
                    addInputsToValues(i);
                    localStorage.data = JSON.stringify(data);
                    document.getElementById('error').style = 'display:none';
                    clearInput(); 
                    showData(); 

                    update.remove();
                    create.style.removeProperty('display');
                    count.style.removeProperty('display');
                    
                    total.innerHTML = ''
                    total.style.backgroundColor = 'rgb(228, 44, 44)';  
                }else{ 
                    let error = document.getElementById('error'); 
                    error.innerHTML = 'Please Enter a Valid Values'; 
                    error.style = 'display:flex';
                }
                
            }
            // create.appendChild(update);
            create.parentNode.insertBefore(update, create.nextSibling);
            create.style.display = 'none';
            count.style.display = 'none';
        }else{
           let error =  document.getElementById('error'); 
           error.innerHTML = 'You Should Update item first';
           error.style.display = 'flex';
        }
       
    }
    
}

//fillter 
function fillterByTitle(){
    let search = document.getElementById('search').value;
    data = JSON.parse(localStorage.data);
    if(search.trim() != ''){
        data = data.filter(a => a.title.match(search));
    }
    showData();
}

function fillterByCategory(){
    let search = document.getElementById('search').value;
    data = JSON.parse(localStorage.data);
    if(search.trim() != ''){
        data = data.filter(a => a.category.match(search));
    }
    showData();
}