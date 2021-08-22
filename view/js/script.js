
(function( w ) {

    document.getElementById('loader-view').style.display = 'none'
    document.getElementById('submit-btn').disabled = true

    var fetchData = async function() {
        var selectElement = document.getElementById('user-select');
        var selectedUser = selectElement.value
        var url = 'https://jsonmock.hackerrank.com/api/transactions?userId='
        if(selectedUser === -1){
            alert('Please Select a user')
        }else{
            document.getElementById('loader-view').style.display = 'block'
            document.getElementById('statements-view').style.display = 'none'
           url = url + selectedUser
           const response = await window.fetch(url);
           const monthlyExpanses = response.json().then((res)=>{
            document.getElementById('loader-view').style.display = 'none'
            document.getElementById('statements-view').style.display = 'block'
            var mainContentContainer = document.getElementById('monthly-statements')
            console.log(res)
            if(res && res.data.length ){
                document.getElementById('user-name').innerHTML = res.data[0].userName || 'N/A'
                var amount = 0
                for(var i = 0 ; i<= res.data.length ;i++){
                    if(res.data[i]){
                        var priceWithOutDollor = res.data[i].amount.replace("$","");
                        amount = res.data[i]['txnType'] === 'debit' ? (amount - parseInt(priceWithOutDollor)) : 
                        amount + parseInt(priceWithOutDollor)
                        //get time value using timestamp 

                        var timeObject = new Date(res.data[i].timestamp)
                        var timeString = timeObject.getDate() + '/' + (timeObject.getMonth()+1) + '/' + timeObject.getFullYear()

                        //create info boxes 
                        var newChildInfoDiv = document.createElement('div');
                        var childPara = document.createElement('p')
                        var childPara2 = document.createElement('p')
                        var childPara3 = document.createElement('p')
                        //Appending date and amount to info boxes 
                        childPara.id='date-para' + '_' + i
                        childPara2.id='type-para' + '_' + i
                        childPara3.id = 'amount-para' + '_' + i
                        childPara.className = 'padding5';
                        childPara2.className= 'padding5';
                        childPara3.className = 'padding5';
                        childPara.innerHTML ="Time : " + timeString 
                        childPara2.innerHTML ="Type : " + (res.data[i]['txnType'] || 'N/A')
                        childPara3.innerHTML ="Amount : " + (res.data[i].amount || 'N/A')
                        newChildInfoDiv.appendChild(childPara)
                        newChildInfoDiv.appendChild(childPara2)
                        newChildInfoDiv.appendChild(childPara3)
                        newChildInfoDiv.id= 'info-box' + '_' + i
                        newChildInfoDiv.className = 'box';
                        mainContentContainer.appendChild(newChildInfoDiv)
                    }
                    // iterate loop over section and append p and labels 
                }
                amount = "$ " + amount 
                document.getElementById('user-balance').innerHTML = amount || 'N/A'
            }
           })
           
        }
    }

    var onDropDownSelect = function(){
        var selectElement = document.getElementById('user-select');
        var selectedUser = selectElement.value
        if(selectedUser > -1){
            document.getElementById('submit-btn').disabled = false
        }
    }

 
  w.fetchData = fetchData,
  w.onDropDownSelect = onDropDownSelect

})( window );
