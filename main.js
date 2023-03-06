       
        var products=[];
        var carts=[];
        if(JSON.parse (window.localStorage.getItem("products") ))
            var products= JSON.parse (window.localStorage.getItem("products") );
        else{
            let randomNumber=Math.floor(Math.random()*6)
            let id=new Date().getTime();
            let data={
                id:id,
                status:false,
                product_name:"iphone 13",
                product_price:"1000",
                product_details:"iphone 13 pro max",
                product_image:"images/iphone1.jpg",
            }
            products.push(data)
        }



            displayAllProducts();
            cartsFunction();

            
        function cartsFunction(){
            carts=[];
            for(var i=0;i<products.length;i++){
                if(products[i].status)
                    carts.push(products[i])
            }
            let count=carts.length;
            console.log(count);
            let el=document.querySelector(".count-carts");
            el.innerHTML=count;
        }


        function openModal(id){
            let modal=document.getElementById(id);
            modal.style.display="block"
        }

        function closeModal(id){
            let modal=document.getElementById(id);
            modal.style.display="none"
        }

        function openCart(id){
            let tbody=document.querySelector("tbody");
            tbody.innerHTML=" ";
            for(var i=0;i<carts.length;i++){

            let text=`
            <tr>
                                <td> ${carts[i].product_name} </td>
                                <td> ${carts[i].product_price} </td>
                                <td> ${carts[i].product_details} </td>
                                <td> <img class="cart-image" src="${carts[i].product_image} " alt=""> </td>
                                <td> <button class="btn-danger" onclick="RemoveFromCart(${carts[i].id})" >Remove  </button> </td>
            </tr>
            
            `
            tbody.innerHTML+=text;

        }


            let modal=document.getElementById(id);
            modal.style.display="block"
        }

        
        function addProduct(){
            let productName=document.querySelector("input[name='product_name']").value;
            let productPrice=document.querySelector("input[name='product_price']").value;
            let productDetails=document.querySelector("textarea[name='product_details']").value;
            let images=[
                "images/iphone1.jpg","images/iphone2.jpg",
                "images/iphone4.jpg","images/iphone3.jpg",
                "images/iphone5.jpg","images/iphone6.jpg",
                "images/iphone5.jpg",
            ];
            let randomNumber=Math.floor(Math.random()*6)
            let id=new Date().getTime();
            let data={
                id:id,
                status:false,
                product_name:productName,
                product_price:productPrice,
                product_details:productDetails,
                product_image:images[randomNumber],
            }
            products.push(data)

            localStorage.setItem('products', JSON.stringify(products));
            displayAllProducts();
        }



        function displayAllProducts(){
            let cards=document.querySelector(".cards")
            cards.innerHTML=" ";
            if(products.length>0){
                    for(var i=0;i<products.length;i++){

                        let text=`
                        <div class="header-card">
                            <div class="card">
                                <div>
                                    <img class="card-img" src="${products[i].product_image}" alt="">
                                </div>
                                <div>
                                    <span class="product_name"> ${products[i].product_name} </span>
                                    <span class="product_price">  ${products[i].product_price}$ </span>
                                </div>
                                <div>
                                    ${products[i].product_details}
                                </div>
                                
                                <div>
                                    
                                    
                                    `;
                                    

                                        if(products[i].status){

                                         text+=   `
                                            <button class="btn-success" onclick="RemoveFromCart(${products[i].id})"> Remove From Cart</button>
                                            `
                                        }else{
                                            text+=   `
                                            <button class="btn-primary" onclick="addToCart(${products[i].id})"> Add To Cart</button>
                                            `
                                        }
                                    text+=`
                                    
                                    <button class="btn-primary" onclick="viewProduct(${products[i].id})">view</button>
                                </div>
                                
                            </div>
                        </div>
                        `
                              cards.innerHTML +=text;  
                    }
                }        }


                function viewProduct(id){
                    let tbody=document.querySelector("#show .inside");
                    for(var i=0;i<products.length;i++){
                        if(products[i].id == id){
                            let text=`
                            <div class="body">
                        <div>
                            <img class="show-image" src="${products[i].product_image}" alt="">
                        </div>
                        <div>
                            ${products[i].product_name}
                        </div>
                        <div>
                            ${products[i].product_price}
                        </div>
                        <div>
                            ${products[i].product_details}
                        </div>                        
                </div>

                <div>
                    <button class="btn-primary" onclick="addToCart(${products[i].id})">  Add To Product </button>
                    <button class="btn-danger" onclick="closeModal('show')">  Close </button>
                </div>
                            
                            `
                            tbody.innerHTML=text;
                            
                        }
                    }
            let modal=document.getElementById("show");
            modal.style.display="block"
                }

            function addToCart(id){
                carts=[];
                for(var i=0;i<products.length;i++){
                    if(products[i].id == id){
                        products[i].status=true;
                    }
                }
                localStorage.removeItem("products");
                localStorage.setItem("products", JSON.stringify(products))
                products= JSON.parse (window.localStorage.getItem("products") );
                cartsFunction()
                displayAllProducts()
                closeModal("show")
            }
            function RemoveFromCart(id){
                carts=[];

                for(var i=0;i<products.length;i++){
                    if(products[i].id == id){
                        products[i].status=false;
                    }
                }
                localStorage.removeItem("products");
                localStorage.setItem("products", JSON.stringify(products))
                products= JSON.parse (window.localStorage.getItem("products") );
                cartsFunction()
                displayAllProducts()
                closeModal("carts")

            }