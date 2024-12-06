var siteName =document.getElementById('bookmarker')
var siteurl =document.getElementById('websiteurl')
var bookmarkerList = [ ];
if(localStorage.getItem('bookmarkerList') != null){
    bookmarkerList = JSON.parse(localStorage.getItem('bookmarkerList'))
displayData();
}

function submit(){
    if(valid(siteName,nameRegx) && valid(siteurl,urlRegex)){
        var bookmarker={
            name : siteName.value,
            url : siteurl.value
        }
        bookmarkerList.push(bookmarker)
        localStorage.setItem('bookmarkerList' , JSON.stringify(bookmarkerList))
        displayLastIndex();
        clearform();
        validRemove();
    }
    else{
        validAlart();
    }
};

function clearform(){
    siteName.value= null;
    siteurl.value= null;
    
};

function displayLastIndex(){
        var container = 
        `<tr>
           <td>${bookmarkerList.length}</td>
           <td>${bookmarkerList[bookmarkerList.length-1].name}</td>
           <td>
            <button onclick="visitBookmarker(${bookmarkerList[bookmarkerList.length-1].url});" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button>
           </td>
           <td>
            <button onclick="deleteBookmarker(${i});" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button>
           </td>
        </tr>`;

    document.getElementById('tbody').innerHTML+=container;
};

function displayData(){
    var container=' ';
    for(i=0 ; i < bookmarkerList.length ; i++){
        container += 
        `<tr>
           <td>${i+1}</td>
           <td>${bookmarkerList[i].name}</td>
           <td>
            <button onclick="visitBookmarker('${bookmarkerList[i].url}');" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button>
           </td>
           <td>
            <button onclick="deleteBookmarker(${i});" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button>
           </td>
        </tr>`;
    };
    document.getElementById('tbody').innerHTML=container;
};


function deleteBookmarker(index){
    bookmarkerList.splice(index , 1)
    localStorage.setItem('bookmarkerList', JSON.stringify(bookmarkerList))
    displayData(bookmarkerList);
    
};

function visitBookmarker(url){
    open(`https://${url}`)
    
}

function valid(element,regx){
    if(regx.test(element.value)){
        if(element.classList.contains('is-invalid')){
            element.classList.remove('is-invalid')
        }
        element.classList.add('is-valid');
        return true;
    }
    else{
        if(element.classList.contains('is-valid')){
            element.classList.remove('is-valid')
        }
        element.classList.add('is-invalid');
        return false
    }
    
}
var nameRegx = /^\w{3,}/;
var urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}$/;
siteName.addEventListener('blur',function(){
    valid(siteName,nameRegx);
})
siteurl.addEventListener('blur',function(){
    valid(siteurl,urlRegex);
})


function validRemove(){
    siteName.classList.remove('is-valid');
    siteurl.classList.remove('is-valid');
}
function validAlart(){
    Swal.fire({
        title:'Site Name or Url is not valid, Please follow the rules below :',
        text:' => Site name must contain at least 3 characters\n=> Site URL must be a valid one'
    })
}