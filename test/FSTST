select a.business_unit , a.po_id
,  a.project_id , b.project_type , count(*)  from sysadm.ps_xx_fcm289_ln a left outer join sysadm.ps_xx_289_d_po_02 p on a.business_unit = p.business_unit and a.po_id = p.po_id , sysadm.ps_xx_289_d_prj_01 b where a.project_id = b.project_id
group by  a.business_unit , a.po_id
,  a.project_id , b.project_type;
