// make var for id
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxtes = document.getElementById('taxtes');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let count= document.getElementById('count');
let category= document.getElementById('category');

let searchTitle= document.getElementById('searchTitle');
let searchCateg= document.getElementById('searchCateg');
let table= document.getElementById('table');
let submit= document.getElementById('submit');
let mony= document.getElementById('mony');
let btnAll = document.getElementById('All');
// console.log(All);
let mood = 'create';



// get totle
function getTotal(){
    if(price.value != ''){

        let result = (+price.value + +taxtes.value + +ads.value) 
        - +discount.value;
        total.innerHTML=result;
        total.style.background='green';

    }else{
        total.style.background='red';
    }    
}

// create product ---------------------------------------------------------------

let dataPro ;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
    }else{
        dataPro = [];
    }
// -----------------
    submit.onclick = function(){
        let newpro = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxtes:taxtes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }
                        // for lop for push new data in table
                        if(mood === 'create'){

                            if(newpro.count > 1){
                                for(let i=0 ; i < newpro.count ; i++){
                                    dataPro.push(newpro)}
                                }else{
                                    dataPro.push(newpro)
                                }
                            }else{
                                dataPro[tmp]=newpro;
                                mood='create';
                                submit.innerHTML='cteate';
                                count.style.display='block';

                            }

                            //save localstorage .....
                        localStorage.setItem("product",   JSON.stringify(dataPro)  )
                  
                          shwoData()
                          claerData()
    }
                        
// CLEAR DATA

    function claerData(){
        title.value ='';
        price.value ='';
        taxtes.value ='';
        ads.value ='';
        discount.value ='';
        count.value ='';
        category.value ='';
        total.innerHTML ='';
    }
    
    //  read data in user entr face 
    function shwoData(){
        getTotal()
        let table = " ";
        
    for(let i = 0 ; i<dataPro.length; i++){
        table +=
        `  
        <tr>
        <td>${i }</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxtes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick='updateDate(${i})' >update</button></td>
        <td><button id="delette" onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;
    // if ror clear data 
    if(dataPro.length > 0 ){
        
        btnAll.innerHTML=`<button onclick='deleted()'>Delete All (${dataPro.length})</button> `
    }else{
        btnAll.innerHTML='';
    }
}
shwoData()

// Delete product
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    shwoData()
}
//delete All data in localStorage and Arry
function deleted(){
    localStorage.clear()
    dataPro.splice(0)
    shwoData()
}
shwoData()

// update date 
function updateDate(i){
    title.value= dataPro[i].title
    price.value= dataPro[i].price
    taxtes.value= dataPro[i].taxtes
    ads.value= dataPro[i].ads
    discount.value= dataPro[i].discount
    total.innerHTML= dataPro[i].total
        count.style.display='none';
        category.value= dataPro[i].category
        submit.innerHTML='update';
        tmp=i;
        mood='update';
        scroll({
            top:0,
            behavior:'smooth'
        
        })
}

//search-----
let searchMood ='title';

function getSearchMood(id){
    let search= document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood ='title';
        search.placeholder='Search Bay Title';
    }else{
        searchMood='category';
        search.placeholder='Search Bay Catogry';
    }
    search.focus()
}


// get search by value
function searchData(value)
{
    let table = "";
    if(searchMood == 'title'){
      for(let i = 0 ; i<dataPro.length ; i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `  
            <tr>
            <td>${i }</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxtes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick='updateDate(${i})' >update</button></td>
            <td><button id="delette" onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;

        }

      }
      
        
        
    }else{
        for(let i = 0 ; i<dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `  
                <tr>
                <td>${i }</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxtes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick='updateDate(${i})' >update</button></td>
                <td><button id="delette" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
    
            }
    
          }
       

    }
    document.getElementById('tbody').innerHTML=table;

}
        
    

