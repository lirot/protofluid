jwt.constants = {};
jwt.constants.keysIndex =
 [
    {key : "TBV" , value : "To Be Vouchered"},
    {key : "IMG" , value : "Image Now"},
    {key : "TBP" , value : "To Be Processed"},
    {key : "INV" , value : "Invalid Vendor"},
    {key : "PEN" , value : "Pending"},
    {key : "UTX" , value : "Use Tax Review"},
    {key : "NEW" , value : "To Enter"},
    {key : "SUB" , value : "Submitted"},
    {key : "VCH" , value : "Vouchered"},
    {key : "DEN" , value : "Denied"},
    {key : "M"   , value : "Approved"},
    {key : "P"   , value : "Pending"},
    {key : "D"   , value : "Denied"},
    {key : "I"   , value : "Passed"},
    {key : "F"   , value : "Removed!"},
    {key : "N"   , value : "Not Routed"}

];
jwt.constants.keys = {};
(function () {
    for (i = 0; i < jwt.constants.keysIndex.length; i++) {
        jwt.constants.keys[ jwt.constants.keysIndex[i].key ] = jwt.constants.keysIndex[i].value;
    }
})();
jwt.constants.datepickerDefaults =
{
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
};

jwt.constants.imgNowURL = "http://nyc0psfs07.na.corp.jwt.com:8080/webnow/index.jsp?action=document&docid=";
