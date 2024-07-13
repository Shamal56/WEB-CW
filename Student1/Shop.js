let Cart = document.querySelector('.cart');
let Close = document.querySelector('.close');
let Body = document.querySelector('body');
let ProductList = document.querySelector('.productlist1');
let ProductList2 = document.querySelector('.productlist2')
let ListCart = document.querySelector('.listcart');
let CartSpan = document.querySelector('.cart span');
let Remove = document.querySelector('.items');

let CartItem =[];

//for opening and closing of the sidebar
Cart.addEventListener('click', () => {
    Body.classList.toggle('showbar')
})
Close.addEventListener('click', () => {
    Body.classList.toggle('showbar')
})

//eventlistner for add to cart button
ProductList.addEventListener('click', (event) => {
    let click = event.target;
    if (click.classList.contains('addtocart')){
        let product = click.closest('.product');
        let product_id = product.id;
        AddtoCart(product_id);
    }
})
ProductList2.addEventListener('click', (event) => {
    let click = event.target;
    if (click.classList.contains('addtocart')){
        let product = click.closest('.product');
        let product_id = product.id;
        AddtoCart(product_id);
    }
})

Remove.addEventListener('click', (event) => {
    let click = event.target;
    if (click.classList.contains('remove')){
        let product = click.closest('.product');
        let product_id = null;
    }
})

const AddtoCart = (product_id) => {
    let ProductIndex = CartItem.findIndex((value) => value.product_id == product_id);
    if (CartItem.length <= 0) {
        CartItem = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (ProductIndex < 0) {
        CartItem.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        CartItem[ProductIndex].quantity = CartItem[ProductIndex].quantity + 1;
    }
    AddTOHTML();
}

const AddTOHTML = () => {
    let TotalQuantity = 0;
    ListCart.innerHTML = '';
    if (CartItem.length > 0) {

        CartItem.forEach(item => {

            TotalQuantity = TotalQuantity + item.quantity;

            const ProductElement = document.querySelector(`.product[id="${item.product_id}"]`);
            const ProductImage = ProductElement.querySelector('img').src;
            const ProductName = ProductElement.querySelector('h2').innerText;
            const ProductPrice = ProductElement.querySelector('.price').innerText;

            const priceNumber = ProductPrice.replace('$', '');
            const totalPrice = priceNumber * item.quantity;

            let NewCart = document.createElement('div');
            NewCart.classList.add('items');
            NewCart.dataset.id = item.product_id;
            NewCart.innerHTML = `
            <div class="image">
                <img src="${ProductImage}" alt="">
            </div>
            <div class="name">
                ${ProductName}
            </div>
            <div class="total">
                $${totalPrice}
            </div>
            <div class="quantity">
                    
                <span>Quantity : ${item.quantity}</span>
                    
            </div>
            <div class="remove">
                <img class="Delete" src="Shop/Trash.png">
            </div>
            `;
        ListCart.appendChild(NewCart);    
        })
    }
    CartSpan.innerText = TotalQuantity;
}

ListCart.addEventListener('click', (event) => {
    let ClickPosition = event.target;
    if (ClickPosition.classList.contains('Delete')) {
        let product_id = ClickPosition.parentElement.parentElement.dataset.id;
        console.log(product_id);
        DeleteProduct(product_id);
    }
    
})

const DeleteProduct = (product_id) => {
    let ItemIndex = CartItem.findIndex((item) => item.product_id === product_id);
    if (ItemIndex !== -1) {
        CartItem.splice(ItemIndex, 1);
        AddTOHTML(); 
    }
}