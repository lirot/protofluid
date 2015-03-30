import XXRP_CORE:xxRP_ACL_ApprovalControlList;
import XXRP_CORE:xxRP_Doc;
import XXRP_CORE:xxRP_Constants;


class xxRP_Transaction
   property XXRP_CORE:xxRP_ACL_ApprovalControlList transACL;
   
   property boolean invoiceNumIsBlank get;
   property boolean invoiceNumIsDuplicate get;
   property boolean invoiceDateIsBlank get;
   property boolean invoiceDateInFuture get;
   property boolean invoiceAmountisZero get;
   property boolean vendorIDExists get;
   property boolean vendorActive get;
   property boolean vendorLocPaymentHold get;
   property boolean vendorLocExists get;
   property boolean vendorLocActive get;
   property boolean transHeaderShipToExists get;
   property boolean transHeaderShipToExempt get;
   property boolean transLinesShipToExist get;
   property boolean transLinesShipToALL get;
   property boolean transHasLines get;
   property boolean transHasLineMissingField get;
   property boolean transHasPO get;
   property boolean transHasProject get;
   property boolean transHasProjectOnlyLine get;
   property boolean isTransPODateExist get;
   property boolean isTransAssetSubCat get;
   property boolean isPOInvoice get;
   property boolean hasPOAddedDeleted get set;
   property boolean hasChange get set;
   property boolean firstApproverInactive get;
   property boolean firstApproverOutOffice get;
   property boolean poVendorIDMatch get;
   property boolean poNumberValid get;
   property boolean poStatusDispatched get;
   property boolean poDateInvoiceDateValid get;
   property boolean projectNumberExists get;
   property boolean projectStatusValid get;
   property boolean transLineTotalLessThanInvoiceAmt get;
   property boolean transLineTotalGrtrThanInvoiceAmt get;
   property boolean useTaxAccrual get;
   property boolean salesTaxOverage get;
   property boolean zeroInvoice get;
   property boolean linePO_Exceeded get;
   property boolean headerPO_Exceeded get;
   property boolean financeApproved get set;
   property boolean curentUserCanApprove get;
   
   property string validateOutString get;
   
   property array of string po_list get;
   property array of string error_list get;
   
   property number CBILL_LineTotal get;
   property number OTH_LineTotal get;
   
   
   
   method xxCreateRP_Transaction(&level0Rowset As Rowset, &xxRP_Doc As XXRP_CORE:xxRP_Doc);
   
   method validate();
   method validateforSASRoute() Returns boolean;
   method validateforApprove() Returns boolean;
   method validateforPass() Returns boolean;
   method validateforFinancePOApprover() Returns boolean;
   method validateforFinanceNoPOApprover() Returns boolean;
   method validateforRelease() Returns boolean;
   method hasSASreturnCondition() Returns boolean;
   method hasFDreturnCondition() Returns boolean;
   
private
   
   instance boolean &_isTransAssetSubCat;
   instance boolean &_isTransPODateExist;
   instance boolean &_invoiceNumIsBlank;
   instance boolean &_invoiceNumIsDuplicate;
   instance boolean &_invoiceDateIsBlank;
   instance boolean &_invoiceAmountisZero;
   instance boolean &_vendorIDExists;
   instance boolean &_vendorActive;
   instance boolean &_vendorLocPaymentHold;
   instance boolean &_vendorLocExists;
   instance boolean &_vendorLocActive;
   instance boolean &_firstApproverInactive;
   instance boolean &_firstApproverOutOffice;
   instance boolean &_isPOInvoice;
   instance boolean &_poVendorIDMatch;
   instance boolean &_poNumberValid;
   instance boolean &_poStatusDispatched;
   instance boolean &_poDateInvoiceDateValid;
   instance boolean &_projectNumberExists;
   instance boolean &_projectStatusValid;
   instance boolean &_transLineTotalLessThanInvoiceAmt;
   instance boolean &_transLineTotalGrtrThanInvoiceAmt;
   instance boolean &_invoiceDateInFuture;
   instance boolean &_transHasLines;
   instance boolean &_transHasPO;
   instance boolean &_transHasProject;
   instance boolean &_transHasProjectOnlyLine;
   instance boolean &_transHeaderShipToExists;
   instance boolean &_transHeaderShipToExempt;
   instance boolean &_transLinesShipToExist;
   instance boolean &_transLinesShipToALL;
   instance Record &_headerRecord;
   instance Rowset &_lineRowSet;
   instance boolean &_linePO_Exceeded;
   instance boolean &_headerPO_Exceeded;
   instance boolean &_zeroInvoice;
   instance boolean &_financeApproved;
   instance boolean &_hasPOAddedDeleted;
   instance boolean &_salesTaxOverage;
   instance boolean &_useTaxAccrual;
   
   instance number &_tax_pct_tol;
   instance number &_tax_amt_tol;
   
   instance boolean &_hasChange;
   
   instance array of string &_po_list;
   instance array of string &_error_list;
   
   instance boolean &_transHasLineMissingField;
   
   instance XXRP_CORE:xxRP_Constants &_o289_Const;
   instance XXRP_CORE:xxRP_Doc &_xxRP_Doc;
   
   instance boolean &_curentUserCanApprove;
   instance number &_CBILL_LineTotal;
   instance number &_OTH_LineTotal;
   
end-class;

Declare Function GetUtilsSingleton PeopleCode PTAFAW_TXN.PTAFPRCS_ID FieldFormula;
Declare Function doUseTaxCalc PeopleCode XX_FCM289_WRK.XX_289_PC_LIBS FieldFormula;
Declare Function getUseTaxRate PeopleCode XX_FCM289_WRK.XX_289_PC_LIBS FieldFormula;

method validateforFinanceNoPOApprover
   /+ Returns Boolean +/
   Local number &foundPosition;
   Local string &transKey;
   
   Local number &tempLen, &i, &tempLen2, &t;
   
   &tempLen = %This.transACL.keySumArray.Len;
   Local string &keystr;
   Local boolean &noApprovalFlg = False;
   
   &tempLen2 = &_xxRP_Doc.Workflow.APR_UserList_ALL.Len;
   Local number &tempLen3, &s;
   Local string &tempStr;
   
   /* check the list for fin approvers later on the chain */
   /* if found &_xxRP_Doc.Workflow.hasUserListFinApprover is set */
   For &t = 1 To &tempLen2
      If Find(&_xxRP_Doc.Workflow.APR_UserList_ALL [&t].userid, &_xxRP_Doc.Workflow.financeApproveList()) <> 0 Then
         &_xxRP_Doc.Workflow.hasUserListFinApprover = True;
         Break;
      End-If;
   End-For;
   
   /*check the temp operator list for users added but not yet on the chain.*/
   &tempLen2 = &_xxRP_Doc.Workflow.APR_UserList_TMP.Len;
   For &t = 1 To &tempLen2
      If Find(&_xxRP_Doc.Workflow.APR_UserList_TMP [&t].userid, &_xxRP_Doc.Workflow.financeApproveList()) <> 0 Then
         &_xxRP_Doc.Workflow.hasUserListFinApprover = True;
         Break;
      End-If;
   End-For;
   
   If Find(&_xxRP_Doc.Workflow.operatorID, &_xxRP_Doc.Workflow.financeApproveList()) <> 0 Then
      Return True;
   Else
      Return False;
   End-If;
   
end-method;

method xxCreateRP_Transaction
   /+ &level0Rowset as Rowset, +/
   /+ &xxRP_Doc as XXRP_CORE:xxRP_Doc +/
   
   &_o289_Const = &xxRP_Doc.o289_Const;
   
   &_headerRecord = &level0Rowset.GetRow(1).GetRecord(Record.XX_FCM289_HDR);
   &_lineRowSet = &level0Rowset.GetRow(1).GetRowset(1);
   %This.transACL = CreateObject("XXRP_CORE:xxRP_ACL_ApprovalControlList");
   %This.transACL.xxCreateRP_ACL_ApprovalControlList();
   
   &_po_list = CreateArrayRept("", 0);
   &_error_list = CreateArrayRept("", 0);
   
   &_xxRP_Doc = &xxRP_Doc;
   Local number &NUM1, &NUM2;
   
   SQLExec("select  A.SALETX_TOL_PCT , A.SALETX_TOL_AMT from ps_BUS_UNIT_OPT_AP A WHERE A.SETID = (select SETID from ps_SET_CNTRL_REC where RECNAME = 'BUS_UNIT_OPT_AP' AND rec_group_id = 'AP_01' AND SETCNTRLVALUE = :1 ) AND A.EFF_STATUS = 'A' AND A.EFFDT = ( SELECT MAX( B.EFFDT) FROM  ps_BUS_UNIT_OPT_AP B WHERE A.SETID = B.SETID AND A.EFF_STATUS = B.EFF_STATUS)", &_headerRecord.BUSINESS_UNIT.Value, &NUM1, &NUM2);
   
   &_tax_amt_tol = &NUM2;
   &_tax_pct_tol = &NUM1;
   
end-method;

method hasFDreturnCondition
   /+ Returns Boolean +/
   
   /* Check if an FD approver already approved */
   /* a flag is set on the component load as the system displays the awe information */
   If &_xxRP_Doc.Workflow.isTransFDApproved Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:isFDApproved:T)";
      Return False;
   End-If;
   
   If &_headerRecord.XX_MARK_URGENT_FLG.Value = "Y" Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasFDreturnCondition:MarkUrgent:T)";
      Return True
   End-If;
   
   If &_headerRecord.XX_WIRE_FLG.Value = "Y" Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasFDreturnCondition:WireFlag:T)";
      Return True
   End-If;
   
   If Not %This.poDateInvoiceDateValid Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasFDreturnCondition:PODate:T)";
      Return True
   End-If;
   
   Return False;
end-method;

method hasSASreturnCondition
   /+ Returns Boolean +/
   
   If All(&_headerRecord.XX_PYMNT_INSTRUCT.Value) Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:PaymentNote:T)";
      Return True
   End-If;
   
   If %This.transLineTotalLessThanInvoiceAmt Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:ShortPay:T)";
      Return True
   End-If;
   
   If &_headerRecord.XX_MARK_URGENT_FLG.Value = "Y" Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:MarkUrgent:T)";
      Return True
   End-If;
   
   If &_headerRecord.XX_WIRE_FLG.Value = "Y" Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:WireFlag:T)";
      Return True
   End-If;
   
   If %This.isTransAssetSubCat Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:AssetSubCat:T)";
      Return True
   End-If;
   
   If &_xxRP_Doc.Workflow.hasTransBeenSentBack Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:hasBeenSentBack:T)";
      Return True
   End-If;
   
   If &_headerRecord.XX_SEND_BACK_SAS.Value = "Y" Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:SendBack:T)";
      Return True
   End-If;
   
   If %This.hasPOAddedDeleted Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:hasSASreturnCondition:hasPOAddedDeleted:T)";
      Return True
   End-If;
   
   Return False
end-method;

get validateOutString
   /+ Returns String +/
   
   Local string &return;
   
   &return = "<div id='XX_HDR_OK' name='XX_HDR_OK' class='to-user'></div><div id='XX_HDR_VT' name='XX_HDR_VT' class='DivWithScroll msg-transaction' ><ul id='xx289Doc-msg'  >:1";
   
   If &_financeApproved Then
      &return = &return | "<li id='msg-fa-001' >Invoice Financially Approved </li>";
   End-If;
   
   If Not %This.transHeaderShipToExists Then
      &return = &return | "<li id='msg-hst-001' >Invoice Header Ship to required for route </li>";
   End-If;
   
   If %This.invoiceDateInFuture Then
      &return = &return | "<li id='msg-ind-001' >Invoice date should be less than or equal to current system date </li>";
   End-If;
   
   If %This.invoiceNumIsBlank Then
      &return = &return | "<li id='msg-req-001' >Invoice Number is Required </li>";
   End-If;
   
   If %This.invoiceNumIsDuplicate Then
      &return = &return | "<li id='msg-dup-003' >Duplicate invoice detected </li>";
   End-If;
   
   If %This.invoiceDateIsBlank Then
      &return = &return | "<li id='msg-req-001' >Invoice Date is Required </li>";
   End-If;
   
   If %This.invoiceAmountisZero Then
      &return = &return | "<li id='msg-req-001' >Invoice Amount is requried</li>";
   End-If;
   
   If Not %This.vendorIDExists Then
      &return = &return | "<li id='msg-006' >Vendor required for route </li>";
   Else
      If %This.vendorLocPaymentHold Then
         &return = &return | "<li id='msg-008' >Vendor location is on Payment hold </li>";
      End-If;
      If Not %This.vendorLocExists Then
         &return = &return | "<li id='msg-009' >Vendor location does not exist </li>";
      End-If;
      If Not %This.vendorLocActive And
            %This.vendorLocExists Then
         &return = &return | "<li id='msg-010' >Vendor location is inactive </li>";
      End-If;
   End-If;
   
   If Not %This.vendorActive And
         %This.vendorIDExists Then
      &return = &return | "<li id='msg-007' >Vendor is not active </li>";
   Else
      
   End-If;
   
   If %This.firstApproverInactive Then
      &return = &return | "<li id='msg-011' >First Approver is not active </li>";
   End-If;
   
   If %This.firstApproverOutOffice Then
      &return = &return | "<li id='msg-012' >Approver is out of office. Are you sure you want to route the invoice?</li>";
   End-If;
   
   If &_transHasPO Then
      If Not %This.poVendorIDMatch Then
         &return = &return | "<li id='msg-013' > Error : You must select a PO with the same vendor ID </li>";
      End-If;
      If Not %This.poNumberValid Then
         &return = &return | "<li id='msg-014' >PO number is not valid  </li>";
      End-If;
      If Not %This.poStatusDispatched Then
         &return = &return | "<li id='msg-015' >PO must have a status of Dispatched </li>";
      End-If;
      If Not %This.poDateInvoiceDateValid Then
         &return = &return | "<li id='msg-016' >PO date must be before the invoice date </li>";
      End-If;
   End-If;
   
   If &_po_list.Len <> 0 Then
      rem &return = &return | "<li class='ps-hidden-error' id='msg-014' >PO on invoice " | &_po_list.Join() | "  </li>";
   End-If;
   
   If &_transHasProject Then
      If Not %This.projectNumberExists Then
         &return = &return | "<liid='msg-017' > Error : Project number is not valid </li>";
      End-If;
      If Not %This.projectStatusValid Then
         &return = &return | "<li id='msg-018' > Project must have a status of OOP or Open </li>";
      End-If;
   End-If;
   
   If %This.transLineTotalGrtrThanInvoiceAmt Then
      &return = &return | "<li id='msg-020'>Line Total must be less than or equal to the Net Invoice Amount</li>";
   End-If;
   
   If %This.linePO_Exceeded Then
      &return = &return | "<li id='msg-022'>Invoice lines PO exception found</li>";
   End-If;
   
   If %This.headerPO_Exceeded Then
      &return = &return | "<li id='msg-023'>Invoice header PO exception found</li>";
   End-If;
   
   If %This.hasChange And
         %This.financeApproved Then
      &return = &return | "<li id='msg-023'>Change Detected</li>";
   End-If;
   
   Local number &len = &_error_list.Len;
   Local array of string &tempArr;
   Local number &I;
   Local string &tempString;
   
   For &I = 1 To &len;
      &tempString = &_error_list [&I];
      &return = &return | "<li class='ps-hidden-error' id='msg-list-error'>" | &tempString | "</li>";
   End-For;
   
   If Not &_xxRP_Doc.User.isUserSAS And
         &_xxRP_Doc.xxDocStatus <> "RFD" Then
      If Not &_transHasProject Then
         &return = &return | "<li id='msg-019-a' >Invoice not fully coded </li>";
      Else
         If %This.transHasLineMissingField Then
            &return = &return | "<li id='msg-019-a' >Invoice line not fully coded </li>";
         End-If;
         If %This.transLineTotalLessThanInvoiceAmt Then
            &return = &return | "<li id='msg-019' >Line total is Less than invoice amount </li>";
         End-If;
      End-If;
      If %This.hasFDreturnCondition() Then
         &return = &return | "<li id='msg-list-return-fd'>Invoice requires FD approval</li>";
      End-If;
      If &_transHasProject And
            %This.hasSASreturnCondition() And
            Not %This.transHasLineMissingField And
            Not %This.transLineTotalLessThanInvoiceAmt Then
         &return = &return | "<li id='msg-list-return-SAS'>Before Payment, Invoice will be returned to SAS</li>";
      End-If;
      If &_transHasProject And
            Not %This.transHasLineMissingField And
            Not &_transLineTotalGrtrThanInvoiceAmt Then
         If %This.isPOInvoice Then
            If %This.validateforFinancePOApprover() Then
               REM  &return = &return | "<li id='msg-024'>user " | &_xxRP_Doc.Workflow.operatorDescr | "  can approve PO only invoice</li>";
            Else
            End-If;
         Else
            If %This.validateforFinanceNoPOApprover() Then
               REM  &return = &return | "<li id='msg-024'>user " | &_xxRP_Doc.Workflow.operatorDescr | "  can Finance approve Non-PO invoice</li>";
            Else
               REM  &return = &return | "<li id='msg-024'>user " | &_xxRP_Doc.Workflow.operatorDescr | "  can NOT Finance approve Non-PO invoice</li>";
            End-If;
         End-If;
      Else
         rem &return = &return | "<li id='msg-024'>user " | &_xxRP_Doc.Workflow.operatorID | "  can NOT Finance approve Non-PO invoice</li>";
      End-If;
   End-If;
   
   If &_xxRP_Doc.xxDocStatus = "RFD" And
         &_xxRP_Doc.User.isUserFD Then
      &return = &return | "<li id='msg-024'>user " | &_xxRP_Doc.Workflow.operatorDescr | "  can FD approve invoice</li>";
   End-If;
   
   If &_useTaxAccrual Then
      &return = &return | "<li id='msg-ut-001' >Use Tax will be accrued</li>";
   End-If;
   
   If &_salesTaxOverage Then
      &return = &return | "<li id='msg-st-001'>Sales Tax entered is more than the calculated amount</li>";
   End-If;
   
   If &_xxRP_Doc.xxDocStatus = "DEN" Or
         &_xxRP_Doc.xxDocStatus = "TBV" Or
         &_xxRP_Doc.xxDocStatus = "VCH" Then
      &return = "<div id='XX_HDR_OK' name='XX_HDR_OK' class='to-user'> to user from validation</div><div id='XX_HDR_VT' name='XX_HDR_VT' class='DivWithScroll msg-transaction' ><ul id='xx289Doc-msg'  >:1";
      If &_xxRP_Doc.xxDocStatus = "TBV" Or
            &_xxRP_Doc.xxDocStatus = "VCH" Then
         &return = &return | "<li id='msg-fa-001'>Invoice Financially Approved</li>";
      End-If;
      &return = &return | "<li id='msg-loced'>Invoice Locked Status: " | &_xxRP_Doc.xxDocStatus | "</li>";
   End-If;
   
   &return = &return | "<li id='msg-022' class='ps-hidden-error'>server validation Complete @..." | Substitute(String(%Time), ".000000", "") | "</li>";
   &return = &return | "</ul></div>";
   
   Return &return;
end-get;


method validateforSASRoute
   /+ Returns Boolean +/
   If (%This.firstApproverInactive) Or
         ( Not %This.vendorIDExists) Or
         ( Not %This.vendorActive) Or
         ( Not %This.vendorLocExists) Or
         ( Not %This.vendorLocActive) Or
         (%This.invoiceNumIsBlank) Or
         (%This.invoiceNumIsDuplicate) Or
         (%This.invoiceDateIsBlank) Or
         (%This.invoiceDateInFuture) Or
         (%This.invoiceAmountisZero) Or
         ( Not %This.transHeaderShipToExists) Then
      
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:Action400:Nhuh)";
      
      Return False;
   Else
      
      Return True;
      
   End-If;
end-method;

method validateforApprove
   /+ Returns Boolean +/
   
   If (%This.firstApproverInactive) Or
         ( Not %This.vendorIDExists) Or
         ( Not %This.vendorActive) Or
         ( Not %This.vendorLocExists) Or
         ( Not %This.vendorLocActive) Or
         %This.invoiceNumIsBlank Or
         (%This.invoiceNumIsDuplicate) Or
         (%This.invoiceDateIsBlank) Or
         (%This.invoiceAmountisZero) Or
         (%This.transLineTotalGrtrThanInvoiceAmt) Or
         Not %This.transHasProject Or
         %This.transHasLineMissingField Or
         ( Not %This.transHeaderShipToExists) Or
         %This.linePO_Exceeded Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:Action400:N)";
      
      Return False;
   Else
      
      Return True;
      
   End-If;
end-method;

method validateforPass
   /+ Returns Boolean +/
   
   Return True;
end-method;

method validateforFinancePOApprover
   /+ Returns Boolean +/
   
   Return True;
end-method;

method validateforRelease
   /+ Returns Boolean +/
   
   If &_headerRecord.SHEET_STATUS.Value = "TBV" Or
         &_headerRecord.SHEET_STATUS.Value = "VCH" Then
      Return False;
   End-If;
   If Not %This.financeApproved Then
      Return False;
   End-If;
   
   If None(&_headerRecord.PYMNT_HANDLING_CD.Value) Then
      &_xxRP_Doc.outTestString = &_xxRP_Doc.outTestString | "(call:Action400:N)";
      Return False;
   End-If;
   
   Return True;
   
end-method;

method validate
   Local string &vendor_setid = &_headerRecord.VENDOR_SETID.Value;
   Local date &invoice_dt = &_headerRecord.INVOICE_DT.Value;
   Local number &invoice_Gross_Amount = &_headerRecord.GROSS_AMT.Value;
   Local string &vendor_id = &_headerRecord.VENDOR_ID.Value;
   Local string &vendor_loc = &_headerRecord.VNDR_LOC.Value;
   Local string &ship_To_hdr = &_headerRecord.SHIPTO_ID.Value;
   Local number &invoice_salesTax = &_headerRecord.SALETX_AMT.Value;
   Local string &invoice_num, &vndr_chk1, &vndr_chk2, &vndr_chk3, &vndr_loc2, &vndr_loc1, &dup_inv_chk, &dup_bu, &first_approver, &oprid_chk1, &oprid_chk2, &last_po, &OLD_VEND;
   &_po_list = CreateArrayRept("", 0);
   &_error_list = CreateArrayRept("", 0);
   &first_approver = &_headerRecord.XX_FIRST_APPR_OPID.Value;
   &_invoiceDateInFuture = False;
   &_invoiceDateIsBlank = False;
   &_invoiceAmountisZero = False;
   &_invoiceNumIsBlank = False;
   &_vendorLocPaymentHold = False;
   &_vendorLocExists = False;
   &_vendorLocActive = False;
   &_invoiceNumIsDuplicate = False;
   &_transHeaderShipToExists = False;
   &_linePO_Exceeded = False;
   &_headerPO_Exceeded = False;
   &_zeroInvoice = False;
   &_useTaxAccrual = False;
   &_salesTaxOverage = False;
   &_poVendorIDMatch = True;
   
   %This.transACL.deleteKeys("ALL");
   
   %This.transACL.xxCreateRP_ACL_ApprovalControlList();
   
   &invoice_num = &_headerRecord.INVOICE_ID.Value;
   Local number &instance_id = &_headerRecord.INSTANCEID.Value;
   
   If None(&ship_To_hdr) Then
      &_headerRecord.USE_TAX.Value = 0;
   End-If;
   
   If All(&ship_To_hdr) Then
      &_transHeaderShipToExists = True;
   End-If;
   
   If &invoice_dt > %AsOfDate Then
      &_invoiceDateInFuture = True;
   End-If;
   
   If &_headerRecord.PTAFUSTEP_INST_ID.Value <> 0 Then
      &_financeApproved = True;
   End-If;
   
   If None(&invoice_dt) Then
      &_invoiceDateIsBlank = True;
   End-If;
   
   If None(&invoice_num) Then
      &_invoiceNumIsBlank = True;
   End-If;
   
   If None(&invoice_Gross_Amount) Then
      &_invoiceAmountisZero = True;
   End-If;
   
   SQLExec("select 'X' from ps_vendor where vendor_id = :1   AND SETID = :2", &vendor_id, &vendor_setid, &vndr_chk1);
   If All(&vndr_chk1) Then
      &_vendorIDExists = True;
   Else
      &_vendorIDExists = False;
   End-If;
   
   SQLExec("select 'X' from ps_vendor where vendor_id = :1   AND SETID = :2 and VENDOR_STATUS = :3 ", &vendor_id, &vendor_setid, "A", &vndr_chk2);
   If All(&vndr_chk2) Then
      &_vendorActive = True;
   Else
      &_vendorActive = False;
   End-If;
   
   SQLExec("select 'X' from PS_VENDOR_PAY where vendor_id = :1   AND SETID = :2 and VNDR_LOC = :3 and PYMNT_HOLD = 'Y' ", &vendor_id, &vendor_setid, &vendor_loc, &vndr_chk3);
   If All(&vndr_chk3) Then
      &_vendorLocPaymentHold = True;
   End-If;
   
   SQLExec("select 'X' from ps_vendor_LOC where vendor_id = :1   AND SETID = :2 and VNDR_LOC = :3  ", &vendor_id, &vendor_setid, &vendor_loc, &vndr_loc1);
   If All(&vndr_loc1) Then
      &_vendorLocExists = True;
   End-If;
   
   SQLExec("select 'X' from ps_vendor_LOC where vendor_id = :1   AND SETID = :2 and VNDR_LOC = :3 and EFF_STATUS = :4 ", &vendor_id, &vendor_setid, &vendor_loc, "A", &vndr_loc2);
   If All(&vndr_loc2) Then
      &_vendorLocActive = True;
   End-If;
   
   SQLExec("SELECT INVOICE_ID , BUSINESS_UNIT  FROM PS_VOUCHER where vendor_id = :1   AND VENDOR_SETID = :2  AND INVOICE_ID = :3 ", &vendor_id, &vendor_setid, &invoice_num, &dup_inv_chk, &dup_bu);
   If All(&dup_inv_chk) Then
      &_invoiceNumIsDuplicate = True;
   Else
      SQLExec("SELECT INVOICE_ID , BUSINESS_UNIT  FROM PS_XX_FCM289_HDR where vendor_id = :1   AND VENDOR_SETID = :2  AND INVOICE_ID = :3 and INSTANCEID <> :4", &vendor_id, &vendor_setid, &invoice_num, &instance_id, &dup_inv_chk, &dup_bu);
      If All(&dup_inv_chk) Then
         &_invoiceNumIsDuplicate = True;
      End-If;
   End-If;
   
   SQLExec("SELECT 'X' FROM PSOPRDEFN where OPRID = :1", &first_approver, &oprid_chk1);
   If None(&oprid_chk1) Then
      &_firstApproverInactive = True;
   Else
      &_firstApproverInactive = False;
   End-If;
   
   /* change to the first approver out of the office check*/
   SQLExec("SELECT 'X' FROM PS_XX_289_D_APPROV WHERE ALTERNATE_ROUTING = 'Y' and OPRID = :1", &first_approver, &oprid_chk2);
   If None(&oprid_chk2) Then
      %This._firstApproverOutOffice = False;
   Else
      %This._firstApproverOutOffice = True;
   End-If;
   
   Local string &VENDOR, &RET_PO_STATUS, &last_pid, &RET_PID_STATUS, &RET_PO_ID, &RET_PID, &RET_PROJECT_TYPE, &RET_DEPTID;
   Local date &RET_PO_DT;
   Local Record &CurrentLineRecord, &CurrentLineRecord_WRK;
   Local string &RETBU, &BUPT, &ship_To_Line;
   Local boolean &firstPOLine, &firstPO, &onePO, &hasLineShipTo;
   Local boolean &po_line_error_fnd, &asst_sub_cat_fnd, &pi_line_error_fnd, &transLineShipToExempt;
   Local integer &i, &foundPosition;
   Local number &LINE_TOTAL, &useTaxCalcdHeader, &rate, &RET_HDR_OPEN_AMT, &lineOpenAmt, &line_Extended_AMT, &po_tolerance;
   Local number &RET_TOLERANCE_AMT, &RET_TOLERANCE_PCT, &po_line_orig_amt_total, &po_line_invoice_amt_total, &line_tax_calced_amount, &invoiceLine;
   
   &_transHasProjectOnlyLine = False;
   &_transHasLineMissingField = False;
   &firstPOLine = True;
   &firstPO = True;
   &onePO = True;
   &_transHasPO = False;
   &_OTH_LineTotal = 0;
   &_CBILL_LineTotal = 0;
   
   
   For &i = &_lineRowSet.ActiveRowCount To 1 Step - 1
      &invoiceLine = &_lineRowSet.ActiveRowCount - &i;
      &CurrentLineRecord = &_lineRowSet.GetRow(&i).GetRecord(Record.XX_FCM289_LN);
      If &_xxRP_Doc.pageFieldProperty <> Null Then
         &CurrentLineRecord_WRK = &_lineRowSet.GetRow(&i).GetRecord(Record.XX_FCM289_WRK);
      End-If;
      If None(&CurrentLineRecord.PO_ID.Value) And
            None(&CurrentLineRecord.PROJECT_ID.Value) Then
      Else
         If None(&CurrentLineRecord.PO_ID.Value) And
               All(&CurrentLineRecord.PROJECT_ID.Value) Then
            &_transHasProjectOnlyLine = True
         End-If;
         
         &_transHasLines = True;
         &hasLineShipTo = False;
         
         If (&_transHasLineMissingField = False) Then
            If None(&CurrentLineRecord.MERCH_AMT_BSE.Value) Or
                  None(&CurrentLineRecord.RESOURCE_SUB_CAT.Value) Then
               &_transHasLineMissingField = True;
               &_error_list.Push("invLine=" | String(&invoiceLine) | ":NOTFULLCODED");
            End-If;
         End-If;
         SQLExec("SELECT BUSINESS_UNIT , PROJECT_TYPE , DEPTID FROM PS_XX_PROJ_ATTRTBL  where PROJECT_ID = :1   ", &CurrentLineRecord.PROJECT_ID.Value, &RETBU, &RET_PROJECT_TYPE, &RET_DEPTID);
         &BUPT = &RETBU | &RET_PROJECT_TYPE;
         If &RET_PROJECT_TYPE = "CBILL" Then
            &_CBILL_LineTotal = &_CBILL_LineTotal + &CurrentLineRecord.MERCH_AMT_BSE.Value;
         Else
            &_OTH_LineTotal = &_OTH_LineTotal + &CurrentLineRecord.MERCH_AMT_BSE.Value;
            &RET_PROJECT_TYPE = "OTH"
         End-If;
         If All(&RET_PROJECT_TYPE) Then
            rem %This.transACL.pushKeys(&RET_PROJECT_TYPE | ":PROJECT_TYPE" | &RETBU | &RET_PROJECT_TYPE, &CurrentLineRecord.MERCH_AMT_BSE.Value);
            %This.transACL.pushKeys(&RET_PROJECT_TYPE | ":PROJECT_TYPE" | &RETBU | &RET_PROJECT_TYPE, &CurrentLineRecord.MERCH_AMT_BSE.Value);
         End-If;
         If &RET_PROJECT_TYPE = "OTH" Then
            If All(&RET_DEPTID) Then
               %This.transACL.pushKeys(&RET_PROJECT_TYPE | ":DEPTID" | &RETBU | &RET_PROJECT_TYPE | &RET_DEPTID, &CurrentLineRecord.MERCH_AMT_BSE.Value);
            End-If;
         End-If;
         If All(&CurrentLineRecord.SHIPTO_ID.Value) Then
            &ship_To_Line = &CurrentLineRecord.SHIPTO_ID.Value;
            &hasLineShipTo = True;
         End-If;
         If "19" = Substring(&CurrentLineRecord.RESOURCE_SUB_CAT.Value, 0, 2) And
               Not (&asst_sub_cat_fnd) Then
            &_isTransAssetSubCat = True;
            &asst_sub_cat_fnd = True;
         End-If;
         
         If &_xxRP_Doc.pageFieldProperty <> Null Then
            &CurrentLineRecord_WRK.XX_LINE_CAN_EDIT.Value = "N";
            &foundPosition = Find(&BUPT, &_xxRP_Doc.User.userBUProjecTypeAccess);
            If &foundPosition = 0 Then
               &CurrentLineRecord_WRK.XX_LINE_CAN_EDIT.Value = "N";
            Else
               &CurrentLineRecord_WRK.XX_LINE_CAN_EDIT.Value = "Y";
            End-If;
            If &_xxRP_Doc.Workflow.APR_UserSteps_PND.Len <> 0 Then
               If Not &_xxRP_Doc.User.isUserSAS And
                     (&_xxRP_Doc.xxDocStatus = "RET" Or
                        &_xxRP_Doc.Workflow.APR_UserSteps_PND [1].approver <> %UserId) Then
                  &CurrentLineRecord_WRK.XX_LINE_CAN_EDIT.Value = "N";
               End-If
            End-If;
         End-If;
         
         If All(&CurrentLineRecord.PO_ID.Value) And
               All(&CurrentLineRecord.BUSINESS_UNIT.Value) Then
            If &last_po <> &CurrentLineRecord.PO_ID.Value Then
               &last_po = &CurrentLineRecord.PO_ID.Value;
               &_po_list.Push(&CurrentLineRecord.PO_ID.Value);
               If Not &firstPO Then
                  &onePO = False;
               End-If;
               If &firstPOLine Then
                  &firstPOLine = True;
                  If &firstPO Then
                     &firstPO = False;
                  Else
                     If &po_line_orig_amt_total < &po_line_invoice_amt_total Then
                        &_headerPO_Exceeded = True;
                     End-If;
                     &po_line_orig_amt_total = 0;
                     &po_line_invoice_amt_total = 0;
                  End-If;
               End-If;
               &RET_HDR_OPEN_AMT = 0;
               SQLExec("SELECT  PO_ID , PO_STATUS , %dateout( PO_DT ) , VENDOR_ID FROM PS_PO_HDR where PO_ID = :1 AND BUSINESS_UNIT = :2 ", &CurrentLineRecord.PO_ID.Value, &CurrentLineRecord.BUSINESS_UNIT.Value, &RET_PO_ID, &RET_PO_STATUS, &RET_PO_DT, &VENDOR);
               SQLExec("SELECT TOLERANCE_AMT , TOLERANCE_PCT FROM PS_XX_BU_OPTIONS where BUSINESS_UNIT = :1 ", &CurrentLineRecord.BUSINESS_UNIT.Value, &RET_TOLERANCE_AMT, &RET_TOLERANCE_PCT);
               SQLExec("SELECT  OPEN_AMT FROM PS_XX_289_D_PO_02 where PO_ID = :1   AND BUSINESS_UNIT = :2 ", &CurrentLineRecord.PO_ID.Value, &CurrentLineRecord.BUSINESS_UNIT.Value, &RET_HDR_OPEN_AMT);
               &firstPOLine = False;
            End-If;
            
            SQLExec("SELECT SUM(D.MONETARY_AMOUNT ) FROM PS_DISTRIB_LINE D,PS_VOUCHER V,PS_PO_LINE_MATCHED M WHERE D.BUSINESS_UNIT=V.BUSINESS_UNIT AND D.VOUCHER_ID=V.VOUCHER_ID AND V.ACCOUNTING_DT <= %DATEIN(:4) AND D.BUSINESS_UNIT=M.BUSINESS_UNIT_AP AND D.VOUCHER_ID=M.VOUCHER_ID AND D.VOUCHER_LINE_NUM=M.VOUCHER_LINE_NUM AND D.BUSINESS_UNIT_PO=:1 AND D.PO_ID=:2 AND D.LINE_NBR=:3 and D.BUSINESS_UNIT_PO <>' ' AND D.PO_ID<>' ' ", &CurrentLineRecord.BUSINESS_UNIT.Value, &CurrentLineRecord.PO_ID.Value, &CurrentLineRecord.PO_LINE_NBR.Value, %AsOfDate, &lineOpenAmt);
            SQLExec(" SELECT MERCH_AMT_BSE FROM PS_XX_FCM174_VW WHERE PO_ID = :2 AND  LINE_NBR = :3 AND BUSINESS_UNIT = :1 ", &CurrentLineRecord.BUSINESS_UNIT.Value, &CurrentLineRecord.PO_ID.Value, &CurrentLineRecord.PO_LINE_NBR.Value, &line_Extended_AMT);
            
            &lineOpenAmt = &line_Extended_AMT - &lineOpenAmt;
            
            If &RET_TOLERANCE_AMT <> 0 And
                  &RET_TOLERANCE_PCT <> 0 Then
               If &RET_TOLERANCE_AMT > (&lineOpenAmt * (&RET_TOLERANCE_PCT / 100)) Then
                  &po_tolerance = (&RET_TOLERANCE_PCT / 100);
               Else
                  &po_tolerance = &lineOpenAmt;
               End-If;
            Else
               If &RET_TOLERANCE_AMT <> 0 Then
                  &po_tolerance = &lineOpenAmt;
               Else
                  &po_tolerance = (&RET_TOLERANCE_PCT / 100);
               End-If;
            End-If;
            
            If ((&lineOpenAmt) * (1 + &po_tolerance)) < &CurrentLineRecord.MERCH_AMT_BSE.Value Then
               &_linePO_Exceeded = True;
               &_error_list.Push("poLine:LineOpenAmt=" | String(&lineOpenAmt) | ":Tol=" | String(&RET_TOLERANCE_PCT) | ":LineAmt=" | String(&CurrentLineRecord.MERCH_AMT_BSE.Value));
            End-If;
            
            &po_line_orig_amt_total = (&po_line_orig_amt_total + (&lineOpenAmt * ((100 + &RET_TOLERANCE_PCT) / 100)));
            &po_line_invoice_amt_total = &po_line_invoice_amt_total + &CurrentLineRecord.MERCH_AMT_BSE.Value;
            
            &_transHasPO = True;
            
            If &vendor_id <> &VENDOR Then;
               &_poVendorIDMatch = False;
               &po_line_error_fnd = True;
            End-If;
            
            If None(&RET_PO_ID) Then
               &_poNumberValid = False;
            Else
               &_poNumberValid = True;
               If &RET_PO_STATUS = "D" Then
                  &_poStatusDispatched = True;
               Else
                  &po_line_error_fnd = True;
                  &_poStatusDispatched = False;
               End-If;
               If All(&RET_PO_DT) Then;
                  &_isTransPODateExist = True;
               Else
                  &_poDateInvoiceDateValid = False;
                  &_isTransPODateExist = False;
               End-If;
               If &RET_PO_DT < &invoice_dt Then;
                  &_poDateInvoiceDateValid = True;
               Else
                  &_poDateInvoiceDateValid = False;
                  &po_line_error_fnd = True;
               End-If;
               
            End-If;
         End-If;
         If None(&pi_line_error_fnd) And
               All(&CurrentLineRecord.PROJECT_ID.Value) Then
            &_transHasProject = True;
            
            SQLExec("SELECT PROJECT_ID , EFF_STATUS FROM PS_PROJECT  where PROJECT_ID = :1   ", &CurrentLineRecord.PROJECT_ID.Value, &RET_PID, &RET_PID_STATUS);
            If None(&RET_PID) Then
               &_projectNumberExists = False;
               &pi_line_error_fnd = True;
            Else
               &_projectNumberExists = True;
               If &RET_PID_STATUS = "A" Then
                  &_projectStatusValid = True;
               Else
                  &_projectStatusValid = False;
                  &po_line_error_fnd = True;
               End-If;
            End-If;
         End-If;
         &last_po = &CurrentLineRecord.PO_ID.Value;
         &last_pid = &CurrentLineRecord.PROJECT_ID.Value;
         
         &LINE_TOTAL = &LINE_TOTAL + &CurrentLineRecord.MERCH_AMT_BSE.Value;
         /* calc utax*/
         If &hasLineShipTo Then
            &rate = getUseTaxRate(&ship_To_Line);
            &line_tax_calced_amount = &line_tax_calced_amount + Round((&CurrentLineRecord.MERCH_AMT_BSE.Value * &rate), 2);
            If &rate <> 0 Then
               &_error_list.Push("UseTxLine=" | &invoiceLine | ":Ship=" | &ship_To_Line | ":runTotal=" | String(&line_tax_calced_amount) | ":LineAmt=" | String((&CurrentLineRecord.MERCH_AMT_BSE.Value)) | ":rate=" | String(&rate));
            Else
               &_error_list.Push("UseTxLine=" | &invoiceLine | ":Ship=EXEMPT");
            End-If;
         End-If
      End-If;
   End-For;
   
   
   If &_lineRowSet.ActiveRowCount = 1 Then
      &_transHasLines = False;
      &_transHasPO = False;
      &_transHasProject = False;
      If &_transHeaderShipToExists Then
         &rate = getUseTaxRate(&ship_To_hdr);
         Local number &tax_amount_calc = &invoice_Gross_Amount - (&invoice_Gross_Amount / (1 + &rate));
         &useTaxCalcdHeader = &tax_amount_calc - &invoice_salesTax;
         &_headerRecord.USE_TAX.Value = &useTaxCalcdHeader;
         &_error_list.Push("pct" | String(&_tax_pct_tol) | "UseTxHdr:Ship=" | &ship_To_hdr | ":GA=" | String(&invoice_Gross_Amount) | ":SalTx=" | String(&invoice_salesTax) | ":rate=" | String(&rate) | ":tax_amt_calc=" | String(&tax_amount_calc));
      End-If
   Else
      &useTaxCalcdHeader = (&line_tax_calced_amount - (&invoice_salesTax));
      &_headerRecord.USE_TAX.Value = &useTaxCalcdHeader;
   End-If;
   
   If &onePO Then;
      If &RET_HDR_OPEN_AMT < &po_line_invoice_amt_total Then
         &_headerPO_Exceeded = True;
      End-If;
   End-If;
   
   If Abs(&_headerRecord.USE_TAX.Value) > 0 Then
      If (&tax_amount_calc * &_tax_pct_tol) > Abs(&_headerRecord.USE_TAX.Value) Then
         &_useTaxAccrual = False;
      Else
         &_useTaxAccrual = True;
      End-If;
      
      If (Abs(&_headerRecord.USE_TAX.Value) > &_tax_amt_tol And
            &_useTaxAccrual) Then
         &_useTaxAccrual = True;
      Else
         &_useTaxAccrual = False;
         &_headerRecord.USE_TAX.Value = 0;
      End-If;
   End-If;
   
   &_transLineTotalLessThanInvoiceAmt = True;
   &_transLineTotalGrtrThanInvoiceAmt = True;
   
   If &LINE_TOTAL = (&_headerRecord.GROSS_AMT.Value - &invoice_salesTax) Then
      &_transLineTotalLessThanInvoiceAmt = False;
      &_transLineTotalGrtrThanInvoiceAmt = False;
   Else
      If &LINE_TOTAL < (&_headerRecord.GROSS_AMT.Value - &invoice_salesTax) Then
         &_transLineTotalGrtrThanInvoiceAmt = False;
      Else
         &_transLineTotalLessThanInvoiceAmt = False;
      End-If;
   End-If;
   
   If &_transHasLines Then
      &_isPOInvoice = False;
      If &_transHasPO Then
         If &_transHasProjectOnlyLine = False Then
            &_isPOInvoice = True;
         Else
            &_isPOInvoice = False;
         End-If;
      Else
         &_poDateInvoiceDateValid = True;
      End-If;
   Else
      &_poDateInvoiceDateValid = True;
   End-If;
   
   If &LINE_TOTAL = 0 Or
         &_headerRecord.GROSS_AMT.Value = 0 Then
      &_zeroInvoice = True;
   End-If;
   
   %This.transACL.sumKeys("ALL");
   &_curentUserCanApprove = False;
   If %This.isPOInvoice Then
      If %This.validateforFinancePOApprover() Then
         &_curentUserCanApprove = True;
      Else
      End-If;
   Else
      If %This.validateforFinanceNoPOApprover() Then
         &_curentUserCanApprove = True;
      Else
      End-If;
   End-If;
   
   If &_xxRP_Doc.pageFieldProperty <> Null Then
      &_xxRP_Doc.Workflow.postValidateWorkflow();
   End-If;
   
end-method;

get financeApproved
   /+ Returns Boolean +/
   Return &_financeApproved;
   
end-get;

set financeApproved
   /+ &NewValue as Boolean +/
   &_financeApproved = &NewValue;
   
   If Not &_financeApproved Then
      
      &_xxRP_Doc.headerRecord.PTAFUSTEP_INST_ID.Value = 0;
   End-If;
   
end-set;

get invoiceDateInFuture
   /+ Returns Boolean +/
   Return &_invoiceDateInFuture;
end-get;

get invoiceNumIsBlank
   /+ Returns Boolean +/
   Return &_invoiceNumIsBlank;
end-get;

get vendorLocExists
   /+ Returns Boolean +/
   Return &_vendorLocExists;
end-get;

get vendorLocPaymentHold
   /+ Returns Boolean +/
   Return &_vendorLocPaymentHold;
end-get;

get transHasProjectOnlyLine
   /+ Returns Boolean +/
   
   Return &_transHasProjectOnlyLine
end-get;

get vendorActive
   /+ Returns Boolean +/
   Return &_vendorActive;
end-get;

get vendorIDExists
   /+ Returns Boolean +/
   Return &_vendorIDExists;
end-get;

get invoiceAmountisZero
   /+ Returns Boolean +/
   Return &_invoiceAmountisZero;
end-get;

get invoiceDateIsBlank
   /+ Returns Boolean +/
   Return &_invoiceDateIsBlank;
end-get;

get invoiceNumIsDuplicate
   /+ Returns Boolean +/
   Return &_invoiceNumIsDuplicate;
end-get;

get firstApproverOutOffice
   /+ Returns Boolean +/
   Return &_firstApproverOutOffice;
end-get;

get vendorLocActive
   /+ Returns Boolean +/
   Return &_vendorLocActive;
end-get;

get firstApproverInactive
   /+ Returns Boolean +/
   Return &_firstApproverInactive;
end-get;

get poVendorIDMatch
   /+ Returns Boolean +/
   Return &_poVendorIDMatch;
end-get;

get poNumberValid
   /+ Returns Boolean +/
   Return &_poNumberValid;
end-get;

get poStatusDispatched
   /+ Returns Boolean +/
   Return &_poStatusDispatched;
end-get;

get poDateInvoiceDateValid
   /+ Returns Boolean +/
   Return &_poDateInvoiceDateValid;
end-get;

get projectNumberExists
   /+ Returns Boolean +/
   Return &_projectNumberExists;
end-get;

get projectStatusValid
   /+ Returns Boolean +/
   Return &_projectStatusValid;
end-get;

get transLineTotalLessThanInvoiceAmt
   /+ Returns Boolean +/
   Return &_transLineTotalLessThanInvoiceAmt;
end-get;

get transLineTotalGrtrThanInvoiceAmt
   /+ Returns Boolean +/
   Return &_transLineTotalGrtrThanInvoiceAmt;
end-get;

get isTransPODateExist
   /+ Returns Boolean +/
   Return &_isTransPODateExist;
end-get;

get isTransAssetSubCat
   /+ Returns Boolean +/
   Return &_isTransAssetSubCat;
end-get;

get transHasLines
   /+ Returns Boolean +/
   Return &_transHasLines;
end-get;

get transHasPO
   /+ Returns Boolean +/
   Return &_transHasPO;
end-get;

get transHasProject
   /+ Returns Boolean +/
   Return &_transHasProject;
end-get;

get isPOInvoice
   /+ Returns Boolean +/
   Return &_isPOInvoice;
end-get;

get transHeaderShipToExists
   /+ Returns Boolean +/
   
   Return &_transHeaderShipToExists
end-get;

get transHeaderShipToExempt
   /+ Returns Boolean +/
   Return &_transHeaderShipToExempt;
end-get;

get transLinesShipToExist
   /+ Returns Boolean +/
   Return &_transLinesShipToExist;
end-get;

get transLinesShipToALL
   /+ Returns Boolean +/
   Return &_transLinesShipToALL;
end-get;

get headerPO_Exceeded
   /+ Returns Boolean +/
   Return &_headerPO_Exceeded;
end-get;

get linePO_Exceeded
   /+ Returns Boolean +/
   Return &_linePO_Exceeded;
end-get;

get hasPOAddedDeleted
   /+ Returns Boolean +/
   
   Return &_hasPOAddedDeleted;
end-get;

set hasPOAddedDeleted
   /+ &NewValue as Boolean +/
   %This.hasChange = True;
   &_xxRP_Doc.headerRecord.XX_PO_ROUTE_LIST.Value = &_xxRP_Doc.headerRecord.XX_PO_ROUTE_LIST.Value | "-PO_REMOVED:" | %OperatorId;
   &_hasPOAddedDeleted = &NewValue;
end-set;

get salesTaxOverage
   /+ Returns Boolean +/
   Return &_salesTaxOverage;
end-get;


get hasChange
   /+ Returns Boolean +/
   
   Return &_hasChange;
end-get;


set hasChange
   /+ &NewValue as Boolean +/
   &_hasChange = &NewValue;
end-set;

get useTaxAccrual
   /+ Returns Boolean +/
   Return &_useTaxAccrual;
end-get;

get transHasLineMissingField
   /+ Returns Boolean +/
   Return &_transHasLineMissingField;
end-get;

get zeroInvoice
   /+ Returns Boolean +/
   Return &_zeroInvoice;
end-get;

get po_list
   /+ Returns Array of String +/
   Return &_po_list;
end-get;

get error_list
   /+ Returns Array of String +/
   Return &_error_list;
end-get;

get curentUserCanApprove
   /+ Returns Boolean +/
   Return &_curentUserCanApprove;
end-get;

get OTH_LineTotal
   /+ Returns Number +/
   Return &_OTH_LineTotal;
end-get;


get CBILL_LineTotal
   /+ Returns Number +/
   Return &_CBILL_LineTotal;
end-get;

