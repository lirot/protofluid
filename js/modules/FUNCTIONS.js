jwt.functions = (function() {
  return {
    init: function() {

      String.prototype.hashCode = function() {
        var hash = 0,
          strlen = this.length,
          i,
          c;
        if (strlen === 0) {
          return hash;
        }
        for (i = 0; i < strlen; i++) {
          c = this.charCodeAt(i);
          hash = ((hash << 5) - hash) + c;
          hash = hash & hash;
          hash = hash + 2147483647;
        }
        return hash.toString();
      };

      Number.prototype.formatMoney = function(c, d, t) {
        var n = this,
          c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
          return s + (j ? i.substr(0, j) + t : "")
	      + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
	      + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
      };

	  //runs immeiately
      jQuery(function() {
        jQuery('form').submit(function() {
          return false;
        });
      });

      jQuery("#image-now").on("mouseover", function() {
        jQuery("input").blur()
      });

      function stopRKey(evt) {
        var evt = (evt) ? evt : ((event) ? event : null);
          var node = (evt.target) ? evt.target : ((evt.srcElement)
						  ? evt.srcElement : null);
        if ((evt.keyCode == 13)) {
          return false;
        }
      }
//functions are available off the namespace jwt.functions
      jQuery.extend(jwt.functions,
        {

printButton : function(){
    var $print = jQuery("#component-data")
        .clone()
        .addClass('print')
        .prependTo('body');
    //window.print() stops JS execution
    window.print();
    //Remove div once printed
    $print.remove();
                 },
            
hasVendor: function() {
            var vendorID = jQuery('#XX_HDR_VI').val();
            if (!vendorID) {
              vendorID = jwt.invoice.header.XX_HDR_VI;
            }
            return vendorID
          },

padout: function(number) {
            return (number < 10) ? '0' + number : number;
          },

pad: function(n, width, z) {
            z = z || '0';
            n = n + '';
              return n.length >= width ? n :
		  new Array(width - n.length + 1).join(z) + n;
          },

editApproverList: function() {
            jwt.invoice.user.isAddFinAppr = false;
            jwt.invoice.user.hasApproverOnChain = false;
            var approverArray = [];
            jQuery("#APPROVER_ADD_LIST li").each(
              function() {
                jwt.invoice.user.hasApproverOnChain = true;
                var elem = jQuery(this)
                if (elem.data('can-approve') == "Y") {
                  jwt.invoice.user.isAddFinAppr = true;
                }
                approverArray.push(jQuery(this).attr("id"));
              }
            )
            if (jwt.invoice.user.isNoLines) {
              jwt.invoice.user.isAddFinAppr = true;
            }
            jwt.invoice.user.approverList = approverArray;
          },

cleanWorkFlowData: function(xml) {

            //function builds the table show to the user
            var moreRows = [];
       var userType, action, startDate, status, EndDate, action
       , comment, area;
            var comments = [];
       var  workflowData = [] ;
      var firstComment = true
       _.each(jwt.invoice.workflowLines, function(Obj, index) {

           var tempRow = [];
           if (Obj.fld_oprid.text == "XX_SAS_START")
               return
		
           var m = moment(Obj.fld_dttm_created.text, "YYYY-MM-DD[T]hh:mm:ss");
              Obj.Created_Date = m.format("MMMM Do YYYY hh:mm:ss").toString();
           var n = moment(Obj.fld_ptafdttm_modified.text,
			  "YYYY-MM-DD[T]hh:mm:ss");
              Obj.Saved_Date = n.format("MMMM Do YYYY hh:mm:ss").toString();

              if (Obj.fld_ptafstep_status.text == 'P') {
                Obj.Saved_Date = ""
              }

              if (Obj.fld_ptafstep_status.text == 'N') {
                Obj.Saved_Date = "";
                Obj.Created_Date = ""
              }
           if ( Obj.fld_ptafstage_nbr.text == "999") {
               if ( firstComment ){
                   comments =[];
                   firstComment = false;
               }
                 var commentObj = {}
               commentObj = {   "stage": Obj.fld_ptafadhoc_by.text ,  
                                "name" : Obj.fld_oprdefndesc.text    ,
                                "date"  :Obj.Saved_Date   ,
                                "text"  :  Obj.fld_comments_254.text      }   
                
                 comments.push( commentObj );
                         return
           }else{
               firstComment = true
           }
       
              // these are SAS rows
  if (Obj.fld_ptafstage_nbr.text == "10" && jwt.user.isSAS) {
                action = "Complete";
                status = jwt.constants.keys[Obj.fld_ptaforig_oprid.text];
                if (Obj.fld_ptaforig_oprid.text == Obj.fld_oprid.text) {
                  status = "Forced Unlock"
                }
                if (Obj.fld_ptafstep_status.text == 'P') {
                  status = " ";
                  action = jwt.constants.keys[Obj.fld_ptafstep_status.text];
                  }
          
      if (comments.length > 0){
          var nArray =  comments.slice();
      }else{
          var nArray = [];
      }
      
                    moreRows.push(
                        {
                        "area" : "SAS",
                     "descr" : Obj.fld_oprdefndesc.text,
	             "action"  :  action ,
                     "col4"  : jwt.constants.keys[Obj.fld_ptafadhoc_by.text],
                            "col5"  :status,
                            "dateCreated" : Obj.Created_Date,
                            "dateSaved" : Obj.Saved_Date,
                            "comments" : nArray
                        });
         comments = [];

   } else {

       Obj.isSAS = false;
   }

   if (Obj.fld_ptafstage_nbr.text == "20") {

       _.findWhere(comments, {"stage": "10"}) ? comments = [] : true ;

       area = "Approver"
                action = "Pending"
		  if (Obj.fld_ptafadhoc_by.text == "RET"
		      || Obj.fld_ptafadhoc_by.text == "ADM") {
                  area = "SAS"
                }
                action = jwt.constants.keys[Obj.fld_ptafstep_status.text];
                  if (Obj.fld_ptafadhoc_by.text
		      == "ADM" && Obj.fld_ptafstep_status.text == "M") {
                  action = "Rerouted"
                }
                  if (Obj.fld_ptafadhoc_by.text != "ADM"
		      && Obj.fld_ptafadhoc_by.text != "ROUTE"
		      && Obj.fld_ptaforig_oprid.text == Obj.fld_oprid.text
		      && Obj.fld_ptafstep_status.text !== "F"
		      && Obj.fld_ptafstep_status.text !== "P"
		      && Obj.fld_ptafstep_status.text !== "I") {
                  action = "Forced Unlock"
                }

                if (Obj.fld_ptaforig_oprid.text == "RET") {
                  action = "Returned to SAS"
                }
                  if (Obj.fld_ptafustep_inst_id.text.indexOf(
		      jwt.invoice.user.aAweID) != -1) {
                  action = "Fincially Approved!"
                  }
        if ( Obj.fld_ptafstep_status.text == "P") {
                  action = "Pending"
                }

                    moreRows.push(
                        {
                        "area" : area,
                        "descr" : Obj.fld_oprdefndesc.text,
			    "action"  :  action ,
                            "col4"  : "Assigned" ,
                            "col5"  :"Took Action",
                            "dateCreated" : Obj.Created_Date,
                            "dateSaved" : Obj.Saved_Date,
                            "comments" : comments.slice()
                        });

           comments = [];
              } else {
                Obj.isApprover = false;
              }

       });

           jwt.invoice.workflowLines = moreRows;

          },

xmlToJson: function(xml) {
            // Create the return object
            var obj = {};
            if (xml.nodeType == 1) { // element
              // do attributes
              if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                  var attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.value;
                }
              }
            } else if (xml.nodeType == 3) { // text
              obj = xml.nodeValue;
            }
            // do children
            if (xml.hasChildNodes()) {
              for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                  var nodeName = item.nodeName == "#text" ? "text"
		      : item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                  obj[nodeName] = jwt.functions.xmlToJson(item);
                } else {
                  if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(jwt.functions.xmlToJson(item));
                }
              }
            }
            return obj;
          },

//NL no location for vendor
setupNLCheck: function(config) {
            jQuery('.NL-check').change(function() {
              cb = jQuery(this);
              cb.val(cb.prop('checked'));
              if (jQuery("#XX_HDR_VI").val()) {
                if (cb.prop('checked')) {
                    config.oldAddress = jQuery('#loc_vendorInfo #addressInfo')
			.html();
                  jQuery('#loc_vendorInfo #addressInfo').html("REMOVED ")
                } else {
                    jQuery('#loc_vendorInfo #addressInfo')
			.html(config.oldAddress);
                }
              } else {
                jQuery('#loc_vendorInfo #addressInfo').html("")
              }
            }).prettyCheckable({
              labelPosition: 'left'
            });

          },

getHashValue: function(key) {
       if (window.location.hash.indexOf("WL") != -1) {
           return window.location.hash.match(new RegExp(key + '=([^&]*)'))[1];
            } else {
              return "999";
            }
          },

formatNumbersQF: function() {
            var elem = jQuery("#XX_HDR_ST");
       var initial_value = elem.val()
	   .replace(/,/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_ST").val(initial_value);

            elem = jQuery("#XX_HDR_GA");
       initial_value = elem.val().replace(/,/g, "")
	   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_GA").val(initial_value);
          },

isValidDate: function(dateString) {
            var date = moment(dateString, ["MM-DD-YYYY", "YYYY-MM-DD"]);
            if (date._i) {
              return true
            }
            return false
          },

addlines: function() {

            var $summands = jQuery("[id^='XX_LIN_MA']");
            var $sumDisplay = jQuery("#XX_HDR_LT");
       var invTotalAmt = Number(jQuery("#XX_HDR_GA")
				.val().replace(/,/g, ""));
            var sum = 0;
            $summands.each(function() {
              var value = Number(jQuery(this).val().replace(/,/g, ''));
              if (!isNaN(value)) {
                sum += value;
                var elem = jQuery(this);
                  var initial_value = elem.val()
		      .replace(/,/g, "")
		      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                jQuery(this).val(initial_value);
              }
            });
            $sumDisplay.val(sum.toFixed(2));
       var netAmt = Number(jQuery("#XX_HDR_GA").val()
			   .replace(/,/g, "")) - Number(jQuery("#XX_HDR_ST")
				.val().replace(/,/g, ""));

            var difference = netAmt - $sumDisplay.val();
            jQuery("#XX_HDR_RA").val(difference.toFixed(2));
            if (difference != 0) {
              $sumDisplay.css('color', 'red');

            } else {
              $sumDisplay.css('color', 'black');
            }
            var elem = jQuery($sumDisplay);
       var initial_value = elem.val().replace(/,/g, "")
	   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $sumDisplay.val(initial_value);
            elem = jQuery("#XX_HDR_GA");
            initial_value = elem.val().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_GA").val(initial_value);
            elem = jQuery("#XX_HDR_RA");
       initial_value = elem.val().replace(/,/g, "")
	   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_RA").val(initial_value);
            elem = jQuery("#XX_HDR_ST");
       initial_value = elem.val().replace(/,/g, "")
	   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_ST").val(initial_value);
            elem = jQuery("#XX_HDR_UT");
       initial_value = elem.val().replace(/,/g, "")
	   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            jQuery("#XX_HDR_UT").val(initial_value);
          },

saveWarning: function(targetfunction) {
            jwt.jwtWorkList.reset_Tabs();
            if (jwt.isDirty) {
              var parms = {
                cancel: true,
                ok: true,
		  message: "You have unsaved data on this page. "
		     + "Click OK to go back and save, or Cancel to continue.",
                loadTemplate: jwt.templates.loadPopUp,
                popCallback: function(elem) {
                  if (jQuery(elem).hasClass('btn-cancel')) {
                    targetfunction()
                  }
                }
              };
              jwt.templates.loadTemplate(parms);
            } else {
              targetfunction();
            }
          },

getDateFormatted: function(datestring) {
            var separator = "/";
            var val = datestring;
            var dmy = "MDY";
            var sep = "/";
            var sepchars = "-/.";
            var sepstr = "\\-\/\\.";
            if (sepchars.indexOf(sep) == -1)
              sepstr += sep;
            var restr;
            restr = "(\\d{1,2})[";
            restr += sepstr;
            restr += "]?(\\d{1,2})[";
            restr += sepstr;
            restr += "]?(\\d{4}|\\d{2})";
            var re = new RegExp("^ *" + restr + " *$");
            var parts = re.exec(val);
            if (parts != null) {
              mnt = parseInt(parts[1], 10);
              day = parseInt(parts[2], 10);
              yr = parseInt(parts[3], 10);
              if (yr < 50) {
                yr = 2000 + yr
              }
		var formattedDate = '' + jwt.functions.padout(mnt)
		    + separator + jwt.functions.padout(day) + separator
		    + jwt.functions.padout(yr);
              return formattedDate;
            }
            return false;
          }
        })
    }
  }
})();
