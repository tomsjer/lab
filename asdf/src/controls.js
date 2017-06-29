var inputs = document.getElementsByTagName('input');
[].forEach.call(inputs,(i)=>{
    i.addEventListener('input',(e)=>{
        window[i.dataset.var][i.dataset.prop] = parseFloat(i.value);
        console.log(window[i.dataset.var][i.dataset.prop])
    });
});