let opt = `<option>----select----</option>`
const addatopt= ()=>{
    let catlocal = JSON.parse(localStorage.getItem('category')) 
    catlocal.map((i)=>{
       opt +=`<option value="${i.id}">${i.category}</option>`
    })
    document.getElementById('catData').innerHTML = opt; 
}
addatopt()

let arr = []
const addatlocal = ()=>{
    let pname = document.getElementById('pname').value;
    let price = document.getElementById('price').value; 
    let catid = document.getElementById('catData').value; 
    let hidev = document.getElementById('hidev').value;
    let imge = localStorage.getItem("productImg");
    let prodlocal = JSON.parse(localStorage.getItem('product')) 
    let prodId = (prodlocal!=null)?prodlocal.length+1:1;
    if (hidev != "") {
      let update=  prodlocal.map((i)=>{
            if (i.no==hidev) {
                i.catid = catid;
                i.product = pname;
                i.img = (imge!= null)?imge:i.img;
                i.price = price;
            }
            return i;
        })
        arr = update  
    }else{
        let obg = {
            no:prodId,
            catid:catid,
            product:pname,
            img:imge,
            price:price,
        }
        arr.push(obg)
    }
    localStorage.setItem("product",JSON.stringify(arr));
    document.getElementById('pname').value=""
    document.getElementById('price').value=""
    document.getElementById('catData').value=""
    document.getElementById('shoIm').src= "" 
    document.getElementById('img').value ="" 
    localStorage.removeItem("productImg");
    disData()
}

const disData=()=>{
    let prodlocal = JSON.parse(localStorage.getItem('product'))
    let catlocal = JSON.parse(localStorage.getItem('category')) 
    prodlocal.map((i)=>{
        catlocal.map((j)=>{
            if (i.catid==j.id) {
                i.proname = j.category
            }
        })
    })
    let tr = ""
    prodlocal.map((i)=>{
      tr+= `<tr>
      <td>${i.no}</td>
      <td>${i.proname}</td>
      <td>${i.product}</td>
      <td><img src="${i.img}" height="50px"></td>
      <td>${i.price}</td>
      <td><button id="remove" onclick= remove(${i.no})>Remove</button> <button id="edit" onclick= edit(${i.no})>Edit</button</td>
      </tr>`
    })
    document.getElementById('adtotable').innerHTML = tr; 
}
disData()



const remove=(no)=>{
    let prodlocal = JSON.parse(localStorage.getItem('product'))
    let remov = prodlocal.filter((i)=>{
        return i.no!= no
    })
    localStorage.setItem("product",JSON.stringify(remov))
    disData()
    let t = 1;
  let aren=   remov.map((i)=>{
        i.no= t++;
        return i;
    })
    localStorage.setItem("product",JSON.stringify(aren))
    disData()
}
const edit = ((no)=>{
    let prodlocal = JSON.parse(localStorage.getItem('product'))
    let edit = prodlocal.find((i)=>{
        return i.no == no
    })
    localStorage.setItem("product",JSON.stringify(edit))
    document.getElementById('hide').value = no;
    document.getElementById('pname').value = edit.product
    document.getElementById('price').value =edit.price;
    document.getElementById('catData').value = edit.catid
    document.getElementById('shoIm').src= edit.img 
    disData()
})

const saveimg =(event)=>{
    var reader = new FileReader();
    reader.onload= ()=>{
        var output = document.getElementById('shoIm');
        output.src = reader.result;
        localStorage.setItem('productImg',reader.result)
    }
    reader.readAsDataURL(event.target.files[0]);
}

