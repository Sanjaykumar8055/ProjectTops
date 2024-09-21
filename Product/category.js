let array = []
const addtolocal= ()=>{
 let catlocal = JSON.parse(localStorage.getItem('category'))  
 let idlen = (catlocal!=null)?catlocal.length+1:1;
 let catname = document.getElementById("catName").value; 
 let hideValu =  document.getElementById('hide').value;
 if (hideValu != "") {
  let updat =  catlocal.map((i)=>{
      if (i.id==hideValu) {
         i.category = catname;
      }
      return i;
   })
   array = updat
 }else{
   let obj = {
      id:idlen,
      category:catname,
   }
   array.push(obj)
 }
 localStorage.setItem("category",JSON.stringify(array))
 document.getElementById("catName").value= ""
 document.getElementById("hide").value = ""
 dispcate()
 
}
const dispcate = ()=>{
   let catlocal = JSON.parse(localStorage.getItem("category"));
   let tr = ""
   catlocal.map((i)=>{
     tr += `<tr>
     <td>${i.id}</td>
     <td>${i.category}</td>
     <td><button id="remove" onclick= remove(${i.id})>Remove</button> <button id="edit" onclick= edit(${i.id})>Edit</button></td>
     </tr>`
   })
   document.getElementById('adddata').innerHTML= tr 
}
dispcate()
const remove = (id)=>{
   let catlocal = JSON.parse(localStorage.getItem("category"));
   let remove = catlocal.filter((i)=>{
      return i.id != id
   })
   localStorage.setItem("category",JSON.stringify(remove));
   dispcate()
   let t = 1;
   let arengId = remove.map((s)=>{
      s.id = t++;
      return s;
   })
   localStorage.setItem("category",JSON.stringify(arengId));
   dispcate()
}
const edit = (id)=>{
   let catlocal = JSON.parse(localStorage.getItem("category"));
   let edit = catlocal.find((i)=>{
      return i.id == id;
   })
   document.getElementById('catName').value = edit.category
   document.getElementById('hide').value =id; 
}