 //CRUD HTTP METHODS
//C-CREATE POST
//READ-GET
//U-URDATE
//D-DELETE
//  const list=document.querySelector('#list')
//  const inputs=document.querySelectorAll('#input')
// const add=document.querySelector('#add')



// const url='https://69f2988fb15130b9735304e9.mockapi.io/products'
// // const list=document.querySelector('#list')
// async function getProducts(){
//     try{
//         const res=await fetch(url)
       
//         const data=await res.json()
//         console.log(data);
//         showProducts(data)
        
//     } catch (err){
//         console.log(err);
        
//     }
// }
// getProducts()
// function showProducts(arr){
//     for(const pr of arr) {
//         list.innerHTML+=`
//         <li>
//         <h4 onclick=delProduct(${pr.id})>${pr.title}</h4>
//         <img src="${pr.image}"/>
//         </li>
//         <button onclick="changeProduct(${pr.id})">Update</button>
//         `
//     }
// }
// async function delProduct(id) {
//     try{
//         const res=await fetch(url+'/'+id, {
//             method:'DELETE',
//             headers:{
//                 'Content-Type': 'application/json'
//             }
//         })
//         const data=await res.json()
//         console.log(data);
//         getProducts()
        
//     } catch(err){
//         console.log(err);
        
//     }
// }
// async function changeProduct(id) {
//     const inputTitle=prompt("Enter title")
//     const imgUrl=prompt("Enter image url")
//     const res=fetch (`${url}/${id}`,{
//         method:"PUT",
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({title: inputTitle, image: imgUrl})
//     })
//     const data=await res.json()
//     getProducts()
// }
// async function createProduct(params) {
//     const res= await fetch(url,{
//         method:"POST",
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({
//             title:inputs[0].value,
//             price:inputs[1].value,
//             image:inputs[2].value
//         })
//     })
//     const data=await res.json()
//     console.log(data);
//     getProducts()
    
// }

// add.onclick=()=>{
//     createProduct()
// };




const list = document.querySelector('#list');
// Выбираем все инпуты (или используйте class="input")
const inputs = document.querySelectorAll('input'); 
const add = document.querySelector('#add');

const url = 'https://69f2988fb15130b9735304e9.mockapi.io/products';

async function getProducts() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        showProducts(data);
    } catch (err) {
        console.log(err);
    }
}
getProducts();

function showProducts(arr) {
    list.innerHTML = ''; 
    for (const pr of arr) {
        list.innerHTML += `
        <li>
            <h4 onclick="delProduct('${pr.id}')">${pr.title}</h4>
            <img src="${pr.image}" style="max-width: 100px;"/>
            <button onclick="changeProduct('${pr.id}')">Update</button>
            <button onclick="delProduct('${pr.id}')">Delete</button>
        </li>
        `;
    }
}

async function delProduct(id) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        getProducts();
    } catch (err) {
        console.log(err);
    }
}

async function changeProduct(id) {
    const inputTitle = prompt("Enter title");
    const imgUrl = prompt("Enter image url");
    
    if (!inputTitle || !imgUrl) return; 

    try {
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: inputTitle, image: imgUrl })
        });
        const data = await res.json();
        getProducts();
    } catch (err) {
        console.log(err);
    }
}

async function createProduct() {
    

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: inputs[0].value,
                price: inputs[1]?.value || 0,
                image: inputs[2]?.value || ''
            })
        });
        const data = await res.json();
        console.log(data);
        
        
        inputs.forEach(input => input.value = '');
        
        getProducts();
    } catch (err) {
        console.log(err);
    }
}


if (add) {
    add.onclick = () => {
        createProduct();
    };
}