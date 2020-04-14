exports.handler = async (event) => {
    
    var data = JSON.parse(JSON.stringify(event.Records));
    console.log(JSON.stringify(data));
     var item = data[0];
     var sns = item.Sns;
     console.log(sns);
     
};
