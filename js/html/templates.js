jwt.templates = {
    "APPROVER_ADD_LIST" : '<li class="ps-approver-list-item" data-can-approve="{{canApprove}}"id="{{id}}"><div class="approver-list-item-label"><a href="#remove" title="Remove" class="remove-approver">X</a><div class="user-div">{{name}} </div><i class="fa fa-female fa-4x"></i><div class="clear"></div></div><div class="arrow-wrapper"><i class="fa fa-arrow-right fa-2x"></i></div></li>',"COMMENT" : '<section id="pop-comment" class="comment"><label> Add a comment</label><div class="textareaBackground xx-temp-comment"><div class="background"></div><textarea id="temp-comment" ></textarea></div></section>',"PAGE_APPROVE" : '<div id="approveModal" class="modalDialog"><div class="PAGE_APPROVE"><a href="#close" title="Close" class="approve-close">X</a><section class="header3"><section id="rf-hdr-messages" class="messages"><ul>{{#errors}}<li id="{{id}}" class="{{class}}"><i class="{{type}}"></i> <span> {{id}}</span> <span>{{text}}</span></li>{{/errors}}</ul></section><section id="comment" class="comment"><div class="div-header"><label> Add a comment</label></div><div class="textareaBackground xx-comment-approver"><textarea id="temp-comment" ></textarea></div></section></section><section class="approver"><div class="af-add-approver"><label> Add approver</label><input type="hidden" class="select2-offscreen" data-ps-tbl-name="XX_APPROVERS" id="loc_S2_APPROVER" placeholder="Add approver"></div></section><section class="approvers-list"><div class="DivListofApprovers"><ul id="APPROVER_ADD_LIST"></ul></div></section><section class="btn-bar approver-modal">{{#user.canView.loc_XX_HPB_500}}<button id="loc_XX_HPB_500" data-route-id="loc_XX_HPB_500" type="button"tabindex="11"></button>{{/user.canView.loc_XX_HPB_500}}{{#user.canView.loc_XX_HPB_501}}<button id="loc_XX_HPB_501" data-route-id="loc_XX_HPB_501" type="button"tabindex="11"></button>{{/user.canView.loc_XX_HPB_501}}{{#user.canView.loc_XX_HPB_410}}<button id="loc_XX_HPB_410" data-route-id="loc_XX_HPB_410" type="button"tabindex="11"></button>{{/user.canView.loc_XX_HPB_410}}<button id="modal-cancel" type="button" class="graphite-flat-button" tabindex="11">Cancel</button></section></div></div>',"PAGE_FULL" : '<section id="full-section" class="component"><form name="component"><div class="header remove-add"><section class="add remove-add"><label>Add Section</label>{{#user.isSAS}}<div class="rf-hdr-vi"><label for="XX_HDR_VI" style="display:none">Vendor</label><input type="hidden" tabindex="4" class="select2-offscreen" {{Locked}} data-ps-tbl-name="XX_289_D_VND_LC" data-s2-drop-class="s2-vendor-drop" data-ps-tbl-id="KEY1" id="loc_S2_XX_HDR_VI" placeholder="Click to add a Vendor" /><input id="XX_HDR_VL" name="XX_HDR_VL" value="{{header.XX_HDR_VL}}" /><input id="XX_HDR_VI" name="XX_HDR_VI" value="{{header.XX_HDR_VI}}" /></div>{{/user.isSAS}}<div class="rf-lin-po"><label for="loc_XX_LIN_PO"style="display:none">Add PO</label><input type="hidden" tabindex="12" class="select2-offscreen" {{Locked}} data-ps-tbl-name="XX_289_D_PO_02" data-s2-drop-class="po-drop1" data-ps-tbl-id="PO_ID" id="loc_S2_XX_LIN_PO" placeholder="Click to add a Purchase Order"></div><div class="rf-lin-pi"><label for="loc_XX_LIN_PI"style="display:none">Add Projecrt</label><input type="hidden" tabindex="13" class="select2-offscreen" {{Locked}} data-ps-tbl-name="XX_289_D_PRJ_01" data-s2-drop-class="" data-ps-tbl-id="PROJECT_ID" id="loc_S2_XX_LIN_PI" placeholder="Click to add a Project ID"></div></section></div><div class="content"><section class="header1"><div class="rf-hdr-ii"><label for="XX_HDR_II">ID</label><span id="XX_HDR_II">{{header.XX_HDR_II}}{{#user.isLocked}}<i class="fa fa-lock "></i>{{/user.isLocked}}</span><span id="XX_HDR_SS" >{{header.XX_HDR_SS}}</span></div><div class="rf-hdr-bu"><label for="XX_HDR_BU ">Business Unit</label><input type="hidden" class="select2-offscreen" data-ps-tbl-name="XX_289_D_BU_SEC" data-s2-drop-class="s2-drop-bu" {{user.canEdit.rf_hdr_bu}} {{isBULocked}} {{Locked}} {{header.Approverdisabled}} data-linked-field="XX_HDR_BU" tabindex="1" id="loc_S2_XX_HDR_BU" /><input id="XX_HDR_BU" name="XX_HDR_BU" value="{{header.XX_HDR_BU}}" /></div><div class="rf-hdr-so"><label for="XX_HDR_SO">Ship To</label><input type="hidden" class="select2-offscreen" data-linked-field="XX_HDR_SO" data-s2-drop-class="s2-drop-shipto" {{Locked}} {{header.Approverdisabled}} data-ps-tbl-name="XX_289_D_SHIPTO" tabindex="2" id="loc_S2_XX_HDR_SO" /><input id="XX_HDR_SO" name="XX_HDR_SO" value="{{header.XX_HDR_SO}}" /></div></section><section class="header3"><section class="rf-hdr-vendor"><div class="loc_vendorInfoFull" id="loc_vendorInfo"><div id="addressInfo">{{#header.XX_HDR_VI}}{{^header.XX_HDR_VL}}<div>Vendor ID:</div><div>{{header.XX_HDR_VI}}</div>No Location Selected{{/header.XX_HDR_VL}}{{/header.XX_HDR_VI}}</div></div>{{#user.isSAS}}{{#header.XX_HDR_VL}}<div class="vl-check"><input class="NL-check" type="checkbox" {{Locked}} value="" data-label="Remove location" tabindex="3" /></div>{{/header.XX_HDR_VL}}{{^header.XX_HDR_VL}}<div class="vl-check displayHidden"><input class="NL-check" {{Locked}} type="checkbox" value="" data-label="Remove location" tabindex="3" /></div>{{/header.XX_HDR_VL}}{{/user.isSAS}}</section><section id="rf-hdr-messages" class="messages" title="User errors and warnings"><ul></ul></section></section><section class="header2">{{#user.isSAS}}<div class="rf-hdr-in"><label for="RF_HDR_IN">Invoice Number</label><input id="XX_HDR_IN" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="5" autocomplete="off" {{Locked}} name="XX_HDR_IN" value="{{header.XX_HDR_IN}}" /></div><div class="rf-hdr-ga"><label for="XX_HDR_GA">Invoice Amount</label><input id="XX_HDR_GA" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="6" autocomplete="off" {{Locked}} name="XX_HDR_GA" value="{{header.XX_HDR_GA}}" /></input></div><div class="rf-hdr-cc"><label for="XX_HDR_CC">CCD</label><input id="XX_HDR_CC" name="XX_HDR_CC" disabled="disabled" value="{{header.XX_HDR_CC}}" /></div><div class="rf-hdr-id"><label for="QF_HDR_ID">Invoice Date</label><input id="XX_HDR_ID" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_HDR_ID" {{Locked}} tabindex="7" value="{{header.XX_HDR_ID}}" /></div><div class="rf-hdr-lt"><label for="XX_HDR_LT">Line Total</label><input id="XX_HDR_LT" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_HDR_LT" disabled="disabled" tabindex="9" value="{{header.XX_HDR_LT}}" /></div><div class="rf-hdr-st"><label for="XX_HDR_ST">Sales Tax</label><input id="XX_HDR_ST" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="8" {{Locked}} autocomplete="off" name="XX_HDR_ST" value="{{header.XX_HDR_ST}}" /></div>{{/user.isSAS}}{{#user.isApprover}}<div class="rf-hdr-in"><label for="RF_HDR_IN">Invoice Number</label><input id="XX_HDR_IN" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="5" {{Locked}} autocomplete="off" name="XX_HDR_IN" disabled="disabled" value="{{header.XX_HDR_IN}}" /></div><div class="rf-hdr-ga"><label for="XX_HDR_GA">Invoice Amount</label><input id="XX_HDR_GA" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="6" {{Locked}} autocomplete="off" name="XX_HDR_GA" disabled="disabled" value="{{header.XX_HDR_GA}}" /></input></div><div class="rf-hdr-cc"><label for="XX_HDR_CC">CCD</label><input id="XX_HDR_CC" name="XX_HDR_CC" disabled="disabled" value="{{header.XX_HDR_CC}}" /></div><div class="rf-hdr-id"><label for="QF_HDR_ID">Invoice Date</label><input id="XX_HDR_ID" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_HDR_ID" tabindex="7" disabled="disabled" value="{{header.XX_HDR_ID}}" /></div><div class="rf-hdr-lt"><label for="XX_HDR_LT">Line Total</label><input id="XX_HDR_LT" name="XX_HDR_LT" tabindex="9" disabled="disabled" value="{{header.XX_HDR_LT}}" /></div><div class="rf-hdr-st"><label for="XX_HDR_ST">Sales Tax</label><input id="XX_HDR_ST" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="8" autocomplete="off" disabled="disabled" name="XX_HDR_ST" value="{{header.XX_HDR_ST}}" /></div>{{/user.isApprover}}<div class="rf-hdr-ra"><label for="XX_HDR_RA">Remaining Amount</label><input id="XX_HDR_RA" name="XX_HDR_RA" tabindex="10" disabled="disabled" value="{{header.XX_HDR_RA}}" /></div><div class="rf-hdr-ut"><label for="XX_HDR_UT">Use Tax</label><input id="XX_HDR_UT" name="XX_HDR_UT" tabindex="11" disabled="disabled" value="{{header.XX_HDR_UT}}" /></div></section><section class="detail">{{#sections}}<section class="group" data-key="{{SectionHeader.key}}" data-project_id="{{SectionHeader.pi}}" data-po_id="{{SectionHeader.po}}" data-can_edit="{{SectionHeader.section_ce}}" ><section class="group-header"><div id="row-header-menu" class="navcontainer nav-action"><ul class="navlist"><li><a href="#" class="xx-link-pj" data-script-id="xxViewProjJacket"><span>Project Jacket</span> </a></li><li><a href="#" class="xx-link-estimate" data-script-id="xxViewProjEstimate"> <span>View Estimate</span> </a></li>{{#SectionHeader.po}}<li><a href="#" class="xx-link-po-view" data-script-id="XX_LIN_PRNT_PO{{ROW}}"> <span>Print PO</span> </a></li><li><a href="#" class="xx-link-po-modify" data-script-id="xxViewPOExp"> <span>Modify PO</span> </a></li>{{/SectionHeader.po}}<li><a href="#" class="xx-link-pi-setup" data-script-id="xxViewProjSetup"> <span>View Setup</span> </a></li><li><a href="#" class="xx-pop-pi tooltip" data-link-id="{{SectionHeader.pi}}"> Pop PJ </a></li>{{#SectionHeader.po}}<li><a href="#" class="xx-pop-po tooltip" data-link-id="{{SectionHeader.po}}"> Pop PO </a></li>{{/SectionHeader.po}}</ul></div><div><label>Projet ID:</label> {{SectionHeader.pi}}</div>{{#SectionHeader.po}}<div><label>PO ID:</label> {{SectionHeader.po}}</div><div class="open-po"><label>Open Amount:</label> 0.00</div>{{/SectionHeader.po}}</section><div class="line1-header"><span class="hdr1">Line#</span><span class="hdr2">Subcat</span><span class="hdr3">Description</span><span class="hdr4">Ship To</span><span class="hdr5">Amt</span><span class="hdr6"></span></div>{{#lines}}<section class="line line1" data-can-edit="{{XX_LIN_CE}}"><div class="rf-lin-pl">{{XX_LIN_PL}}</div><div class="rf-lin-sc"><input type="hidden" class="select2-offscreen lin_S2_XX_LIN_SC" data-s2-drop-class="s2-drop-subcat" {{Locked}} data-ps-tbl-name="XX_289_D_SC_01" data-pi="{{SectionHeader.pi}}" id="lin_S2_XX_LIN_SC" placeholder="Subcat"><input class="XX_LIN_SC" id="XX_LIN_SC{{ROW}}" name="XX_LIN_SC{{ROW}}" value="{{XX_LIN_SC}}" /></div><div class="rf-lin-ld"><input id="XX_LIN_LD{{ROW}}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_LIN_LD{{ROW}}" {{Locked}} value="{{XX_LIN_LD}}" placeholder="Description" /></div><div class="rf-lin-so"><input type="hidden" class="select2-offscreen lin_S2_XX_LIN_SO" {{Locked}} data-ps-tbl-name="XX_289_D_SHIPTO" data-s2-drop-class="s2-drop-shipto" data-line="SO" data-pi="{{SectionHeader.pi}}" id="lin_S2_XX_LIN_SO" placeholder="Ship To"><input class="XX_LIN_SO" id="XX_LIN_SO{{ROW}}" name="XX_LIN_SO{{ROW}}" value="{{XX_LIN_SO}}" /> </div><div class="rf-lin-ma"> <input id="XX_LIN_MA{{ROW}}" data-row-id="{{ROW}}" class="XX_LIN_MA" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" {{Locked}} name="XX_LIN_MA{{ROW}}" value="{{XX_LIN_MA}}" placeholder="Amount" /></div>{{^SectionHeader.section_ce}} <span class="row-buttons"><span class="lockDialog-line"><i class="fa fa-lock"></i></span>{{^user.isLocked}}<a href="#" title="show asset information" class="show-asset" data-row-id="{{ROW}}" ><i class="fa fa-check-square-o"></i>Asset</a><a href="#" title="show quantity PO inforation" class="show-qty" data-row-id="{{ROW}}"><i class="fa fa-square-o"></i>Qty</a>{{/user.isLocked}} </span> {{/SectionHeader.section_ce}}{{#SectionHeader.section_ce}}{{^user.isLocked}}<div class="row-buttons"><a href="#" title="show asset information" class="show-asset" data-row-id="{{ROW}}"><i class="fa fa-square-o"></i>Asset</a><a href="#" title="show quantity PO inforation" class="show-qty" data-row-id="{{ROW}}"><i class="fa fa-square-o"></i>Qty </a><a href="#" id="loc_XX_ACTIVE_GRID$new${{ROW}}$${{ROW}}" name="XX_ACTIVE_GRID$new{{ROW}}$$0" data-route-id="loc_row_new" class="ps-new"><i class="fa fa-plus-square"></i></a><a href="#" id="loc_XX_ACTIVE_GRID$delete${{ROW}}$${{ROW}}" name="XX_ACTIVE_GRID$delete{{ROW}}$$0" data-route-id="loc_row_delete" class="ps-delete"><i class="fa fa-minus-square"></i></a> </div>{{/user.isLocked}}{{/SectionHeader.section_ce}}</section><section class="line line2" data-row-id="{{ROW}}" data-can-edit="{{XX_LIN_CE}}"><div><span class="hdr0">-</span><span class="hdr1">Profile</span><span class="hdr2">Asset ID</span><span class="hdr3">Item</span><span class="hdr4">Unit</span><span class="hdr5">Qty</span><span class="hdr6">Price</span></div> <div class="rf-lin-ab"><input class="XX_LIN_AB" id="XX_LIN_AB{{ROW}}" name="XX_LIN_AB{{ROW}}" value="{{XX_LIN_AB}}" /> </div> <div class="rf-lin-indent"><i class="fa fa-level-down"></i> </div> <div class="rf-lin-ap"><input type="hidden" class="select2-offscreen lin_S2_XX_LIN_AP" data-s2-drop-class="s2-drop-subcat" disabled="disabled" data-ps-tbl-name="PROFILE_TBL" data-pi="{{SectionHeader.pi}}" id="loc_S2_XX_LIN_AP" placeholder="Profile"><input class="XX_LIN_AP" id="XX_LIN_AP{{ROW}}" name="XX_LIN_AP{{ROW}}" value="{{XX_LIN_AP}}" /></div><div class="rf-lin-ai"><input type="hidden" class="select2-offscreen loc_S2_XX_LIN_AI" disabled="disabled" data-ps-tbl-name="ASSET" data-s2-drop-class="s2-drop-shipto"data-pi="{{SectionHeader.pi}}" id="loc_S2_XX_LIN_AI" placeholder="Asset ID"><input class="XX_LIN_AI" id="XX_LIN_AI{{ROW}}" name="XX_LIN_AI{{ROW}}" value="{{XX_LIN_AI}}" /></div><div class="rf-lin-ii"><input type="hidden" class="select2-offscreen loc_S2_XX_LIN_II" disabled="disabled" data-ps-tbl-name="MASTER_ITEM_TBL" data-s2-drop-class="s2-drop-shipto" data-pi="{{SectionHeader.pi}}" id="loc_S2_XX_LIN_II" placeholder="item"><input class="XX_LIN_II" id="XX_LIN_II{{ROW}}" name="XX_LIN_II{{ROW}}" value="{{XX_LIN_II}}" /></div><div class="rf-lin-um"><input type="hidden" class="select2-offscreen loc_S2_XX_LIN_UM" disabled="disabled" data-ps-tbl-name="XX_289_D_UNIT" data-s2-drop-class="s2-drop-shipto" data-pi="{{SectionHeader.pi}}" id="loc_S2_XX_LIN_UM" placeholder="Unit"><input class="XX_LIN_UM" id="XX_LIN_UM{{ROW}}" name="XX_LIN_UM{{ROW}}" value="{{XX_LIN_UM}}" /></div><div class="rf-lin-lq"><input id="XX_LIN_PQ{{ROW}}" data-row-id="{{ROW}}" autocomplete="off" disabled="disabled" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_LIN_PQ{{ROW}}"{{Locked}} value="{{XX_LIN_PQ}}" placeholder="Qty" /></div><div class="rf-lin-up"><input id="XX_LIN_UP{{ROW}}" data-row-id="{{ROW}}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_LIN_UP{{ROW}}" disabled="disabled" {{Locked}} value="{{XX_LIN_UP}}" placeholder="Unit Price" /></div></section>{{/lines}}</section>{{/sections}}</section><section class="payment"><label> Payment Information</label><div class="rf-hdr-pm"><label for="XX_HDR_PM">Message</label><input id="XX_HDR_PM" name="XX_HDR_PM" {{Locked}} value="{{header.XX_HDR_PM}}" /></div><div class="rf-hdr-wi"><input name="XX_HDR_WI" id="loc_XX_HDR_WI" data-label="Wire" {{Locked}} class="ps-check" type="checkbox" data-ps-id="XX_HDR_WI"></input></div><div class="rf-hdr-sb"><input name="XX_HDR_SB" id="loc_XX_HDR_SB" data-label="SAS Review" {{Locked}} class="ps-check" type="checkbox" data-ps-id="XX_HDR_SB"></input></div><div class="rf-hdr-mu"><input name="XX_HDR_MU" id="loc_XX_HDR_MU" data-label="Urgent" {{Locked}} class="ps-check" type="checkbox" data-ps-id="XX_HDR_MU"></input></div><div class="rf-hdr-hf"><input name="XX_HDR_HF" id="loc_XX_HDR_HF" data-label="Hold" {{Locked}} class="ps-check" type="checkbox" data-ps-id="XX_HDR_HF"></input></div><div class="rf-hdr-hc"><label for="XX_HDR_HC">Handling</label><select id="loc_XX_HDR_HC" data-ps-id="XX_HDR_HC" {{Locked}} title="Select" name="XX_HDR_HC" placeholder="select"><option> None </option><option value="HD">High Dollar Payment</option><option value="LO">Local Office Pickup </option><option value="RE">Regular Payments</option><option value="SP">Special Handling</option></select></div><div class="rf-hdr-py"><label for="XX_HDR_PY">Instructions</label><select name="XX_HDR_PY" id="loc_XX_HDR_PY" {{Locked}} data-ps-id="XX_HDR_PY" title="Select" placeholder="select"><option value="none" > None </option><option value="P">Employee Pickup</option><option value="U">UPS</option><option value="F">FedEx</option><option value="M">Messenger</option></select></div><div class="rf-hdr-pn"><label for="XX_HDR_PN" id="psInstlbl">Instructions</label><input id="XX_HDR_PN" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" {{Locked}} name="XX_HDR_PN" value="{{header.XX_HDR_PN}}" /></div></section><section class="header0"><section id="comment" class="comment"><label> Add a comment</label><div class="textareaBackground xx-comment"><div class="background"></div><textarea {{Locked}} id="XX_HDR_CT" name="XX_HDR_CT"></textarea></div></section><section id="workflow" class="workflow"><label> Workflow Information</label></section></section>{{#user.isSAS}}{{^user.isRET}}<section class="approver"><div class="rf-hdr-fa"><label> First Approver</label><input type="hidden" class="select2-offscreen" {{Locked}} data-ps-tbl-name="XX_289_D_APPROV" id="loc_S2_XX_HDR_FA" placeholder="First approver"><input id="XX_HDR_FA" name="XX_HDR_FA" value="{{header.XX_HDR_FA}}" /></div></section>{{/user.isRET}}{{/user.isSAS}}<section class="actions"><span class="x-split-button">{{#user.canView.loc_XX_HPB_001}}<button id="loc_XX_HPB_001" data-route-id="loc_XX_HPB_001" class="x-button x-button-main"></button> {{/user.canView.loc_XX_HPB_001}} {{#user.canView.loc_XX_HPB_350}}<button class="x-button x-button-drop sun-flower-button">&#9660;</button><ul class="x-button-drop-menu" id="loc_XX_HPB_350">{{#user.isSAS}}<li><a href="#"data-route-id="loc_XX_HPB_350"data-value="INV">Invalid Vendor</a></li><li><a href="#"data-route-id="loc_XX_HPB_350"data-value="UTX">Use Tax Review </a></li><li><a href="#"data-route-id="loc_XX_HPB_350"data-value="TBP">To Process</a></li><li><a href="#"data-route-id="loc_XX_HPB_350"data-value="PEN">Pending</a></li>{{/user.isSAS}}{{#user.isApprover}}<li><a href="#"data-route-id="loc_XX_HPB_350" data-value="SFL">Save for Later</a></li><li><a href="#"data-route-id="loc_XX_HPB_350" data-value="APM">Awaiting Project Milestone </a></li><li><a href="#" data-route-id="loc_XX_HPB_350" data-value="APS">Awaiting Project Status</a></li><li><a href="#" data-route-id="loc_XX_HPB_350" data-value="ICI">Incorrect Invoice</a></li><li><a href="#" data-route-id="loc_XX_HPB_350" data-value="ICP">Incorrect PO</a></li><li><a href="#" data-route-id="loc_XX_HPB_350" data-value="OTH">Other</a></li>{{/user.isApprover}}</ul>{{/user.canView.loc_XX_HPB_350}}</span><div class="btn-bar"> {{#user.canView.loc_XX_HPB_520}} <button id="loc_XX_HPB_520" data-route-id="loc_XX_HPB_520" type="button" ></button> {{/user.canView.loc_XX_HPB_520}} {{#user.canView.loc_XX_HPB_540}} <button id="loc_XX_HPB_540" data-route-id="loc_XX_HPB_540" type="button" ></button> {{/user.canView.loc_XX_HPB_540}} {{#user.canView.loc_XX_HPB_600}} <button id="loc_XX_HPB_600" data-route-id="loc_XX_HPB_600" type="button" ></button> {{/user.canView.loc_XX_HPB_600}} {{#user.canView.loc_XX_HPB_400}} <button id="loc_XX_HPB_400" data-route-id="loc_XX_HPB_400" type="button" ></button> {{/user.canView.loc_XX_HPB_400}} {{#user.canView.loc_XX_HPB_521}} <button id="loc_XX_HPB_521" data-route-id="loc_XX_HPB_521" type="button" ></button> {{/user.canView.loc_XX_HPB_521}} {{#user.canView.loc_XX_HPB_530}} <button id="loc_XX_HPB_530" data-route-id="loc_XX_HPB_530" type="button" ></button> {{/user.canView.loc_XX_HPB_530}} {{#user.canView.loc_XX_HPB_PRI}} <button id="loc_XX_HPB_PRI" data-route-id="loc_XX_HPB_PRI" type="button" ></button> {{/user.canView.loc_XX_HPB_PRI}}</div></section><input id="XX_HDR_SC" name="XX_HDR_SC" value="{{header.XX_HDR_SC}}" /><input id="XX_HDR_IP" name="XX_HDR_IP" value="" /><input id="XX_HDR_LO" name="XX_HDR_LO" value="" /></div></form></section>',"PAGE_QUICK" : '<section id="quick-section" class="component"><div class="qf-hdr-ii"><label for="XX_HDR_II">ID</label><span id="XX_HDR_II">{{XX_HDR_II}}</span></div><div class="qf-hdr-id"><label for="QF_HDR_ID">Invoice Date</label><input id="XX_HDR_ID" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="XX_HDR_ID" tabindex="1" value="{{XX_HDR_ID}}" /></div><div class="qf-hdr-bu"><label for="XX_HDR_BU ">Business Unit</label><input name="XX_HDR_BU" type="hidden" class="select2-offscreen" data-ps-tbl-name="XX_289_D_BU_SEC"tabindex="2" id="loc_S2_XX_HDR_BU" /></div><div class="qf-hdr-in"><label for="QF_HDR_IN">Invoice Number</label><input name="XX_HDR_IN" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="XX_HDR_IN" tabindex="3" autocomplete="off" value="{{XX_HDR_IN}}" /></input></div><div class="qf-hdr-ga"><label for="XX_HDR_GA">Invoice Amount</label><input name="XX_HDR_GA" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="XX_HDR_GA" tabindex="4" autocomplete="off" value="{{XX_HDR_GA}}" /></input></div><div class="qf-hdr-st"><label for="XX_HDR_ST">Sales Tax</label><input name="XX_HDR_ST" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="XX_HDR_ST" tabindex="5" autocomplete="off" value="{{XX_HDR_ST}}" /></div><div class="qf-hdr-po"><label for="XX_LIN_PO">Purchase Order</label><input type="hidden" class="select2-offscreen" data-ps-tbl-name="XX_289_D_PO_02" data-s2-drop-class="po-drop1" data-ps-tbl-id="PO_ID"tabindex="6" id="loc_S2_XX_LIN_PO" /><input id="XX_LIN_PO" name="XX_LIN_PO" value="{{XX_LIN_PO}}" /></div><div class="qf-hdr-vi"><label for="XX_HDR_VI">Vendor</label><input type="hidden" class="select2-offscreen" tabindex="7" data-ps-tbl-name="XX_289_D_VND_LC" data-ps-tbl-id="KEY1"id="loc_S2_XX_HDR_VI" /><input id="XX_HDR_VL" name="XX_HDR_VL" value="{{XX_HDR_VL}}" /><input id="XX_HDR_VI" name="XX_HDR_VI" value="{{XX_HDR_VI}}" /></div><div class="loc_vendorInfoQuick" id="loc_vendorInfo"><div id="addressInfo"></div><div class="vl-check displayHidden"><input class="NL-check" type="checkbox" value="" data-label="Remove location" tabindex="3" /></div></div><div class="qf-hdr-so"><label for="XX_HDR_SO">Ship To</label><input name="XX_HDR_SO" type="hidden" class="select2-offscreen" tabindex="10" data-ps-tbl-name="XX_289_D_SHIPTO" data-ps-tbl-id="SHIPTO_ID"id="loc_S2_XX_HDR_SO" /></div><div class="qf-hdr-fa"><label for="XX_HDR_FA">First Approver</label><input name="XX_HDR_FA" type="hidden" class="select2-offscreen" tabindex="9" data-ps-tbl-name="XX_289_D_APPROV" data-ps-tbl-id="OPRID"id="loc_S2_XX_HDR_FA" /></div><div class="loc-ps-approver-buttons"><button id="loc_XX_HPB_310" data-route-id="loc_XX_HPB_310" type="button"tabindex="11">Add</button><button id="loc_XX_HPB_320" data-route-id="loc_XX_HPB_320" type="button"tabindex="12">Invalid Vendor</button><button id="loc_XX_HPB_330" data-route-id="loc_XX_HPB_330" type="button"tabindex="13">Use Tax</button><button id="loc_XX_HPB_340" data-route-id="loc_XX_HPB_340" type="button"tabindex="14">Pending</button></div></section>',"POPUP" : '<div id="user-pop-up" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><p>{{message}}</p><div>{{{subTemplate}}}</div>{{#cancel}}<input id="cancel" type="submit" value="Cancel" class="btn-cancel graphite-flat-button">{{/cancel}}{{#ok}}<input id="ok" type="submit" value="OK" class="btn-ok nephritis-flat-button">{{/ok}}</div></div>',"SELECT2_ADD_FOOTER" : '<div class="header {{Definition}}"><div class="header" style="display:none"><span><a id="col" href="#">PO ID</a></span><span><a id="col" href="#">Vendor ID</a></span><span><a id="col" href="#">Name</a></span><span><a id="col" href="#">Entered by</a></span><span><a id="col" href="#">PO Date</a></span><span><a id="col" href="#">PO Status</a></span><span><a id="col" href="#">Customer Name</a></span><span><a id="col" href="#">Short Name</a></span><span><a id="col" href="#">Product</a></span><span><a id="col" href="#">Media type</a></span><span><a id="col" href="#">Project ID</a></span><span><a id="col" href="#">Description</a></span><span><a id="col" href="#">Proj Owner</a></span><span><a id="col" href="#">Dept</a></span><span><a id="col" href="#">Descr</a></span></div></div>',"SELECT2_ADD_HEADER" : '<div class="{{Definition}}"> <h4>Purchase Order Search</h4></div>',"SELECT2_PO" : '<div class="po-slim-s2-row"><div class="s2-drop header"><span>{{PO_ID}}</span><span>{{VENDOR_ID}}</span><span>{{NAME1}}</span><span>{{XX_PO_ENTERED_BY}}</span><span>{{XX_DTTM_CHAR}}</span><span>{{XX_PO_STATUS_DESCR }}</span><span>{{XX_CUST_NAME_LONG}}</span><span>{{XX_CUST_NAME_SHORT}}</span><span>{{XX_PRODUCT}}</span><span>{{XX_MEDIA_TYPE_ID }}</span><span>{{PROJECT_ID}}</span><span>{{PROJ_DESCR}}</span><span>{{XX_PRJ_OWNER_NAME}}</span><span>{{DEPTID}}</span><span>{{DEPTID_DESCR}}</span></div></div>',"SELECT2_PROJECT" : '<div class="pi-slim-s2-row"><div class="s2-drop header"><span>{{XX_CUST_NAME_LONG}}</span><span>{{XX_CUST_NAME_SHORT}}</span><span>{{PROJECT_ID}}</span><span>{{PROJ_DESCR}}</span><span>Type:{{PROJECT_TYPE}}</span><span>{{XX_MEDIA_TYPE_ID }}</span><span>{{XX_PRODUCT}}</span><span>{{DEPTID}}</span><span>{{DEPTID_DESCR}}</span><span>BU:{{BUSINESS_UNIT}}</span></div></div>',"SELECT2_VENDOR" : '<div ><div ><span>{{VENDOR_ID}}</span><span>{{NAME1}}</span><span class="{{VENDOR_STATUS}}">{{VENDOR_STATUS}}</span><span>{{VENDOR_NAME_SHORT}}</span><span>{{VNDR_LOC}}</span><span>{{ADDRESS1}}</span><span>{{ADDRESS2}}</span><span>{{CITY}}&nbsp,&nbsp{{STATE}}</span></div></div>',"SELECT2_XX_APPROVER" : '<div><div><span>{{PERSON_NAME}}</span><span>{{STATUS_DESCR}}</span><span>{{DESCR120}}</span><span>{{BUSINESS_UNIT}}</span>{{#canApprove}}<i class="fa fa-check fa-3x canApprove"></i><spanclass="canApprove"> Finance Approver! </span>{{/canApprove}}</div></div>',"TABS_APPROVERS" : '<ul class="navlist"><li ><a data-tab="0" href="#">My Invoices</a><i data-count-wlid="0" ></i></li><li ><a data-tab="1" href="#">In Process</a><i data-count-wlid="1"></i></li><li ><a data-tab="2" href="#">To Approve</a><i data-count-wlid="2"></i></li><li ><a data-tab="3" href="#">Invoices Sent Back</a><i data-count-wlid="3"></i></li></ul>',"TABS_SAS" : '<ul class="navlist"><li ><a data-tab="0" href="#">All Invoices</a><i data-count-wlid="0" ></i></li><li ><a data-tab="1" href="#">Enter</a><i data-count-wlid="1"></i></li><li ><a data-tab="2" href="#">Process</a><i data-count-wlid="2"></i></li><li ><a data-tab="3" href="#">Vendor</a><i data-count-wlid="3"></i></li><li ><a data-tab="4" href="#">Use Tax</a><i data-count-wlid="4"></i></li><li ><a data-tab="5" href="#">Pending</a><i data-count-wlid="5"></i></li><li ><a data-tab="6" href="#">Review</a><i data-count-wlid="6"></i></li></ul>',"TOOLTIP" : '<a href="#" class="tooltip">Tooltip<span><img class="callout" src="images/callout.gif" /><strong>Most Light-weight Tooltip</strong><br />This is the easy-to-use Tooltip driven purely by CSS.</span></a>',"TOOLTIP_PO_INFO" : '<a href="#" class="tooltip">PO Info:<span><img class="callout" src="images/callout.gif" /><strong>PO : </strong><br /><b>Bus Unit:</b> {{BUSINESS_UNIT}}</br><b>PO Status:</b>{{XX_PO_STATUS_DESCR}}</br><b>Bill to:</b>{{OPRDEFNDESC}}</br><b>PO Date:</b>{{XX_PO_DT_CHAR}}</br><b>Vndr Loc:</b> {{VNDR_LOC}}</br><b>PO Header Bill Location: </b> {{SHIPTO_ID}}</br></span></a>',"TOOLTIP_PROJECT_INFO" : '<a href="#" class="tooltip">PJ Info:<span><img class="callout" src="images/callout.gif" /><strong>Project : </strong><br /><b>Bus Unit:</b> {{BUSINESS_UNIT}}</br><b>OU:</b>{{OPERATING_UNIT}}</br><b>Proj Owner:</b>{{XX_PRJ_OWNER_NAME}}</br><b>Type:</b>{{PROJECT_TYPE}}</br><b>Status:</b> {{PROJECT_STATUS}}</br><b>DeptID: </b> {{DEPTID}}</br><b>Start Date:</b>{{XX_START_DT_CHAR}}</br><b>Finish Date:</b> {{XX_BASE_FINISH_CHR}}</br><b>Client Name Short: </b> {{XX_CLNT_NAME_SHORT}}</br><b>Division:</b>{{DIVISION}}</br><b>Brand:</b> {{XX_BRAND_DESCR}}</br><b>Product: </b> {{XX_PRODUCT_DESCR}}</br></span></a>',"VENDOR_INFO" : '<div class="VENDOR_INFO"><h4>{{VENDOR_ID}}<span class="{{VENDOR_STATUS}}">{{VENDOR_STATUS}}</span></h4><h5>{{NAME1}}</h5><div>{{VENDOR_NAME_SHORT}}</div><div>{{VNDR_LOC}}</div><div>{{ADDRESS1}}</div><div>{{ADDRESS2}}</div><div>{{CITY}}&nbsp,&nbsp{{STATE}}&nbsp&nbsp&nbsp{{POSTAL}}</div></div>',"ms-debug" : '<div ><p> logged in as: {{user.operDescr}}</p><p> Is user SAS: {{user.isSAS}}</p><p> IsLocked: {{user.isLocked}}</p></div>',"ms_01_dialog_unlock" : '<div id="openModal" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h2>Unlock</h2><p>{{name}}</p><input id="unlock-cancel" type="submit" value="Cancel" class="graphite-flat-button">{{#threeButtonFlag}}<input id="unlock-view" type="submit" value="View" class="nephritis-flat-button">{{/threeButtonFlag}}<input id="unlock-open" type="submit" value="Unlock" class="peter-river-flat-button"></div></div>',"ms_10_S2_PI_Drop_Slim" : '<div class="pi-slim-s2-row"><div class="s2-drop header"><span>{{XX_CUST_NAME_LONG}}</span><span>{{XX_CUST_NAME_SHORT}}</span><span>{{PROJECT_ID}}</span><span>{{PROJ_DESCR}}</span><span>Type:{{PROJECT_TYPE}}</span><span>{{XX_MEDIA_TYPE_ID }}</span><span>{{XX_PRODUCT}}</span><span>{{DEPTID}}</span><span>{{DEPTID_DESCR}}</span><span>BU:{{BUSINESS_UNIT}}</span></div></div>',"ms_10_S2_PO_Drop_Slim" : '<div class="po-slim-s2-row"><div class="s2-drop header"><span>{{PO_ID}}</span><span>{{VENDOR_ID}}</span><span>{{NAME1}}</span><span>{{XX_PO_ENTERED_BY}}</span><span>{{XX_DTTM_CHAR}}</span><span>{{XX_PO_STATUS_DESCR }}</span><span>{{XX_CUST_NAME_LONG}}</span><span>{{XX_CUST_NAME_SHORT}}</span><span>{{XX_PRODUCT}}</span><span>{{XX_MEDIA_TYPE_ID }}</span><span>{{PROJECT_ID}}</span><span>{{PROJ_DESCR}}</span><span>{{XX_PRJ_OWNER_NAME}}</span><span>{{DEPTID}}</span><span>{{DEPTID_DESCR}}</span></div></div>',"ms_10_S2_PO_Drop_Wide" : '<div class="po-wide-s2-row"><span>{{PO_ID }}</span><span>{{NAME1}}</span><span>{{XX_PO_ENTERED_BY}}</span><span>{{XX_DTTM_CHAR}}</span><span>{{XX_PO_STATUS_DESCR}}</span><span>{{XX_CUST_NAME_LONG}}</span><span>{{XX_CUST_NAME_SHORT}}</span><span>{{XX_PRODUCT}}</span><span>{{XX_MEDIA_TYPE_ID}}</span><span>{{XX_CUST_NAME_LONG}}</span><span>{{PROJECT_ID}}</span><span>{{PROJ_DESCR}}</span><span>{{XX_PRJ_OWNER_NAME}}</span><span>{{DEPTID}}</span><span>{{DEPTID_DESCR}}</span></div>',"ms_10_S2_Vendor" : '<div class="vendor-s2-row"><div class="s2-drop header"><span>{{VENDOR_ID}}</span><span>{{NAME1}}</span></div><p>{{VENDOR_NAME_SHORT}}</><p>{{VNDR_LOC}}</p><p>{{ADDRESS1}}</p><p>{{ADDRESS2}}</p><p>{{CITY}}&nbsp,&nbsp{{STATE}}</p><span>Status&nbsp:&nbsp{{VENDOR_STATUS}}</span></div>',"ms_AWE" : '<label>Workflow Information</label><table class="AWE tablesorter"><tbody><tr class="summary"><td colspan="1" style="padding: 0 0px 0 0px;"><table class="tablesorter-child"><thead><tr><th></th><th>Date</th><th>Time</th><th>Duration</th></tr></thead><tbody><tr><td>Invoice Received from Vendor</td><td>10/10/2015</td><td>110:25</td><td>4</td></tr><tr><td>Invoice Sent to First Approver</td><td>10/10/2015</td><td>110:25</td><td>4</td></tr><tr><td>Invoice Financially Approved</td><td>10/10/2015</td><td>110:25</td><td>4</td></tr</tbody></table></td></tr><tr class="tablesorter-childRow"><td colspan="4" style="padding: 0 0px 0 0px;">{{#isSAS}}<h3>SAS</h3><table class="tablesorter-child"><thead><tr><th>User</th><th>Opened</th><th>Saved</th><th>Entered DTTM</th><th>Exit DTTM</th></tr></thead><tbody>{{#workflowLines}}{{#hasComment}}<tr><td></td><td colspan="4" style="padding: 0 0px 0 0px;"><table class="tablesorter-child"><tbody><tr><td>{{fld_comments_254.text}}</td></tr></tbody></table></td></tr><tr><td>{{fld_oprdefndesc.text}}</td><td>{{OpenedStatusDescr}}</td><td>{{SavedStatusDescr}}</td><td>{{Created_Date}}</td><td>{{Saved_Date}}</td></tr>{{/hasComment}}{{/workflowLines}}</tbody></table>{{/isSAS}}<h3>Approver</h3><table class="tablesorter-child"><thead><tr><th>User</th><th>Action</th><th>from</th><th>Saved</th><th>Entered DTTM </th><th>Exit DTTM </th></tr></thead><tbody>{{#workflowLines}}{{#isApprover}}{{#hasComment}}<tr><td></td><td>Comment Entered on:</td><td>{{fld_xx_dttm_char.text}}</td></tr><tr><td></td><td></td><td>{{fld_comments_254.text}}</td></tr>{{else}}<tr><td>{{fld_oprdefndesc.text}}</td><td>{{ActionDescr}}</td><td>{{fld_adhoc_by.text}}</td><td>{{SavedStatusDescr}}</td><td>{{Created_Date}}</td><td>{{Saved_Date}}</td></tr>{{/hasComment}}{{/isApprover}}{{/workflowLines}}</tbody></table></td></tr></tbody></table>',"ms_error" : '<li id="{{id}}"class="{{class}}"><i class="{{type}}" title="{{id}}"></i><span>{{text}}</span></li>',
    "done": "true"
  };