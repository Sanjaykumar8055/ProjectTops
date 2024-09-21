let tr = ` <li class="nav-item">
                                    <a class="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span class="text-dark" style="width: 130px;">All Products</span>
                                    </a>
                                </li>`;
let cartdata = JSON.parse(localStorage.getItem('category'))  
let prodata = JSON.parse(localStorage.getItem('product'))
let t = 2;                              
cartdata.map((i)=>{
    tr+=`<li class="nav-item">
                                    <a class="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-${t++}">
                                        <span class="text-dark" style="width: 130px;">${i.category}</span>
                                    </a>
                                </li>`
})
document.getElementById('cart').innerHTML = tr; 
let pr = `
  <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="row g-4">`
                                    prodata.map((t)=>{
                                            pr+= `  <div class="col-md-6 col-lg-4 col-xl-3">
                                                    <div class="rounded position-relative fruite-item">
                                                        <div class="fruite-img">
                                                            <img src="${t.img}" class="img-fluid w-100 rounded-top" alt="">
                                                        </div>
                                                        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${t.product}</div>
                                                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h4>${t.product}</h4>
                                                            
                                                            <div class="d-flex justify-content-between flex-lg-wrap">
                                                                <p class="text-dark fs-5 fw-bold mb-0">${t.price} $</p>
                                                                <a  class="btn border border-secondary rounded-pill px-3 text-primary"onclick="addToCart(${t.no})"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>`
                                        
                                     })                                    
                                       
pr += `</div>
        </div>
    </div>
</div>
`
let s= 2;
let proddata = JSON.parse(localStorage.getItem('product'))
cartdata.map((i)=>{
    pr +=` <div id="tab-${s++}" class="tab-pane fade show p-0">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="row g-4">`
                        proddata.map((t)=>{
                        if (t.catid==i.id) {
                            pr+= `  <div class="col-md-6 col-lg-4 col-xl-3">
                                    <div class="rounded position-relative fruite-item">
                                        <div class="fruite-img">
                                            <img src="${t.img}" class="img-fluid w-100 rounded-top" alt="">
                                        </div>
                                        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${t.product}</div>
                                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                            <h4>${t.product}</h4>
                                            
                                            <div class="d-flex justify-content-between flex-lg-wrap">
                                                <p class="text-dark fs-5 fw-bold mb-0">${t.price}</p>
                                                <a  class="btn border border-secondary rounded-pill px-3 text-primary" onclick="addToCart(${t.no})"><i class="fa fa-shopping-bag me-2 text-primary"></i>add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                        }
                        })   
                                      
    pr+=        `</div>
        </div>
    </div>
</div>`
}) 

document.getElementById('productlist').innerHTML = pr


 let cart = []
 const addToCart=(no)=>{
    let cartData = JSON.parse(localStorage.getItem('allData'))
    if (cartData!=null) {
        let checkId = cartData.find((i)=>{
            return i.pid == no
        })
        if (checkId!=undefined) {
            let finalData = cartData.map((i)=>{
                if (i.pid==no) {
                    i.qty += 1;
                }
                return i;
            })
            localStorage.setItem("allData",JSON.stringify(finalData));
        }else {
            let catid = (cartData!=null)?cartData.length+1:1;
            let allData= proddata.find((i)=>{
                return i.no == no
            })
            let obj = {
                crtid:catid,
                qty:1,
                pid:no,     
                pname:allData.product,
                price:allData.price,
                img:allData.img
            }
            cartData.push(obj)
        
            localStorage.setItem("allData",JSON.stringify(cartData));
            }
    } else {
    let catid = (cartData!=null)?cartData.length+1:1;
    let allData= proddata.find((i)=>{
        return i.no == no
    })
    let obj = {
        crtid:catid,
        qty:1,
        pid:no,
        pname:allData.product,
        price:allData.price,
        img:allData.img
    }
    cart.push(obj)
    console.log(cart);

    localStorage.setItem("allData",JSON.stringify(cart));
    }
    
}
