
let data = [];
const utility = {
    fetchData: async (url, method='GET', mode='no-cors', number= 10, offset, filteredText) => {
        try{
            if(data && data.length<=0){
                let result = await fetch(url, {method, withCredentials:true, headers:{
                    "X-Auth-Token": '901458329729327105-4vVx1fKC9M3k4Rl93n4u6oVIFOYfPHl'
                }});
                data = await result.json();
                let endIndex = Math.min((offset + 1) * number, data.length);
                return filteredText.length <=0 ? data.slice(Math.max(endIndex - number, 0), endIndex):
                data.slice(Math.max(endIndex - number, 0), endIndex).filter((x)=>x.title == filteredText);   
            }
            else{

                let endIndex = Math.min((offset + 1) * number, data.length);
                return filteredText.length <=0  ?data.slice(Math.max(endIndex - number, 0), endIndex):
                data.slice(Math.max(endIndex - number, 0), endIndex).filter((x)=> x.title == filteredText) ;   
            }
            
        }
        catch(error){
            throw new Error({message:error});
        }
    },

    debounce: function(fn, delay){
        let timer;
        return function(){
            let context = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn.apply(context, args);
            }, delay);
        }
    }


}