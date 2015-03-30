

--list of invoices and vendors , first approvers in test
select a.vendor_id , c.name1 , c.vendor_status , b.person_name from sysadm.ps_xx_fcm289_hdr a, sysadm.ps_xx_289_d_approv b , ps_vendor c where a.xx_first_appr_opid = b.oprid and a.vendor_id = c.vendor_id

--list of po and projects on invoices in test
select a.business_unit , a.po_id , p.vendor_id , p.name1 , p.po_status , p.xx_po_entered_by ,  a.project_id , b.project_type , a.resource_sub_cat , a.merch_amt_bse from sysadm.ps_xx_fcm289_ln a left outer join sysadm.ps_xx_289_d_po_02 p on a.business_unit = p.business_unit and a.po_id = p.po_id , sysadm.ps_xx_289_d_prj_01 b where a.project_id = b.project_id

--list of SAS users
SELECT a.OPRID , a.OPRDEFNDESC , b.useridalias FROM SYSADM.PS_XX_289_AWE_M_VW a , SYSADM.PS_XX_289_D_APPROV B WHERE PTAFSTAGE_NBR = 10 and  a.oprid = b.oprid;

--list of approvers who can NOT finanically approve 
[     
        JWTERUBIN01	 :ELLEN RUBIN : ERUBIN
        JWTKMARTINEZ02	: KATTY MARTINEZ : KMARTINEZ
        DD2012-04-24t09-44-12-492	: DAWN DOUMENG : DDOUMENG
        JC2013-05-06t09-01-45-567	: JULIA PAPIRIS : JCLARK 
        JWTSNIGRI01	 : SHARON NIGRI  : SNIGRI   ] 
SELECT A.OPRID , A.OPRDEFNDESC , b.useridalias FROM SYSADM.PS_XX_289_AWE_M_VW A , SYSADM.PS_XX_289_D_APPROV B
                                                                WHERE a.OPRID = b.oprid
                                                                and A.PTAFSTAGE_NBR = 20 
                                                                AND A.OPRID NOT IN ( SELECT OPRID FROM SYSADM.PS_XX_APPRV_289_VW ) 
                                                                and a.oprid not in ( select oprid from sysadm.ps_xx_289_awe_m_vw where ptafstage_nbr = 10 )

--business unit project type security for an oprid

select * from sysadm.ps_xx_289_d_sec_01 where oprid in ( 'jwtERUBIN01' , 'JWTKMARTINEZ02' ,'dd2012-04-24t09-44-12-492','jc2013-05-06t09-01-45-567' ) order by 1

SELECT * FROM SYSADM.PS_XX_289_D_APPROV

-- SAS gets the whole list for a user bu project type security
select * from sysadm.ps_xx_289_d_po_02 a where  1=1 AND ( a.business_unit , a.project_type ) in  ( select b.business_unit , b.project_type from sysadm.ps_xx_289_d_sec_01 b where b.oprid = 'jwtJSuffel01' )
select * from sysadm.ps_xx_289_d_prj_01

--approval authority matrix

select * from sysadm.ps_xx_apprv_289_vw